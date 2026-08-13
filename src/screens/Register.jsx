import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import Tabs, { ProgressBar } from '../components/Tabs';
import MicBar from '../components/VoiceBar';
import { PrimaryButton } from '../components/Buttons';
import { METHOD_ICON } from '../components/MethodIcons';
import { useApp } from '../state/AppContext';

// Ported from "00a1 Phone Register.js" / "00a2 IC Register.js" /
// "00a3 Face ID Register.js" / "00a4 Email Register.js" and their (Error) variants.

const METHODS = [
  { value: 'phone', label: 'Phone' },
  { value: 'ic', label: 'IC' },
  { value: 'faceId', label: 'Face ID' },
  { value: 'email', label: 'Email' },
];

const FIELD = {
  phone: { title: 'phone Number', helper: 'Works for everyone', placeholder: '+60-XX-XXX-XXXX', cta: 'Continue' },
  ic: { title: 'IC number', helper: 'Works for everyone', placeholder: '000000-00-0000', cta: 'Continue' },
  faceId: { title: 'Face ID', helper: 'Fastest - No typing', placeholder: null, cta: 'Continue' },
  email: { title: 'Email', helper: 'Works for everyone', placeholder: 'example@mail.com', cta: 'Continue' },
};

const DUP_MESSAGE = {
  phone: 'Phone Number Already in Use',
  ic: 'IC Already In Use',
  email: 'Email Already in use',
};

function validate(method, value) {
  const v = value.trim();
  if (!v) return 'This field is required';
  const digits = v.replace(/[^0-9]/g, '');
  if (method === 'phone' && !/^\d{9,11}$/.test(digits)) return 'Enter a valid phone number';
  if (method === 'ic' && !/^\d{12}$/.test(digits)) return 'Enter a valid IC number';
  if (method === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address';
  return null;
}

export default function Register() {
  const navigate = useNavigate();
  const { SEED_USER } = useApp();
  const [method, setMethod] = useState('phone');
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [faceTried, setFaceTried] = useState(false);

  const field = FIELD[method];
  const hasError = Boolean(error);

  function switchMethod(m) {
    setMethod(m);
    setValue('');
    setError(null);
    setScanning(false);
  }

  function submit() {
    if (method === 'faceId') {
      setScanning(true);
      setError(null);
      setTimeout(() => {
        setScanning(false);
        if (!faceTried) {
          setFaceTried(true);
          setError('No Camera Detected');
        } else {
          navigate('/register/password', { state: { method, value: 'Face ID profile' } });
        }
      }, 1100);
      return;
    }
    const v = validate(method, value);
    if (v) { setError(v); return; }
    if (SEED_USER[method]?.toLowerCase() === value.trim().toLowerCase()) {
      setError(DUP_MESSAGE[method]);
      return;
    }
    setError(null);
    navigate('/register/password', { state: { method, value: value.trim() } });
  }

  return (
    <>
      <ScreenHeader stepLabel="Step 1 of 2" title="Create your account" logoTo="/" speaker={false} />

      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', paddingInline: '24px' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingInline: '24px' }}>
          <MicBar />
        </div>

        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Choose whichever suits you best
        </div>

        <ProgressBar fill="171px" />

        <Tabs options={METHODS} value={method} onChange={switchMethod} />
      </div>

      {/* Field card — turns error-tinted exactly like the (Error) exports */}
      <div style={{
        alignSelf: 'center',
        backgroundColor: hasError ? 'var(--color-error-tint)' : 'var(--color-card)',
        borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)',
        borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px',
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '12px',
        marginTop: '12px', padding: '16px', width: '342px',
      }}>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '14px' }}>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '48px', justifyContent: 'center', width: '48px' }}>
            {METHOD_ICON[method]}
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
            <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
              {field.title}
            </div>
            <div style={hasError
              ? { boxSizing: 'border-box', color: 'var(--color-error)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '18px' }
              : { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}
            >
              {scanning ? 'Scanning your face…' : error || field.helper}
            </div>
          </div>
        </div>

        {method === 'faceId' ? (
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '320px', justifyContent: 'center', width: '300px', alignSelf: 'center' }}>
            {hasError ? (
              /* No camera: crossed-out camera instead of the face preview */
              <svg width="190" height="190" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }} className="fade-in">
                <circle cx="100" cy="100" r="72" fill="none" stroke="var(--color-error)" strokeWidth="9" />
                <rect x="52" y="74" width="96" height="60" rx="10" fill="none" stroke="var(--color-error)" strokeWidth="8" />
                <path d="M78 74 l9-15 h26 l9 15" fill="none" stroke="var(--color-error)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="100" cy="104" r="19" fill="none" stroke="var(--color-error)" strokeWidth="8" />
                <circle cx="132" cy="88" r="4.5" fill="var(--color-error)" />
                <path d="M49 151 L151 49" stroke="var(--color-error)" strokeWidth="10" strokeLinecap="round" />
              </svg>
            ) : (
              <div style={{
                backgroundImage: 'url(https://app.paper.design/file-assets/01KZRP0Z5H214K6Z1EYJYNZZJK/01KZTK5317MVMD7QAZ4N9JK7YG.png)',
                backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'var(--radius-card)', boxSizing: 'border-box',
                flexShrink: '0', height: '320px', width: '300px', opacity: scanning ? 0.55 : 1, transition: 'opacity 0.2s ease',
              }} />
            )}
          </div>
        ) : (
          <input
            value={value}
            onChange={(e) => { setValue(e.target.value); if (error) setError(null); }}
            placeholder={field.placeholder}
            style={{
              alignItems: 'center', backgroundColor: 'var(--color-background)', borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)',
              borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex',
              flexShrink: '0', height: '50px', paddingInline: '16px', width: '100%', outline: 'none',
              color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', lineHeight: '24px',
            }}
          />
        )}
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <PrimaryButton onClick={submit} disabled={scanning}>
          {scanning ? 'Scanning…' : field.cta}
        </PrimaryButton>
      </div>
    </>
  );
}
