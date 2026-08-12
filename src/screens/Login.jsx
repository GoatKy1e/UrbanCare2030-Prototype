import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../components/Tabs';
import MicBar from '../components/VoiceBar';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { useApp } from '../state/AppContext';

// Ported from "00d Login Phone.js" / "00d Login IC.js" /
// "00d Login Face ID.js" / "00d Login Email.js"

const METHODS = [
  { value: 'phone', label: 'Phone' },
  { value: 'ic', label: 'IC' },
  { value: 'faceId', label: 'Face ID' },
  { value: 'email', label: 'Email' },
];

const LABEL = { phone: 'Phone Number', ic: 'IC Number', email: 'email@mail.com' };

export default function Login() {
  const navigate = useNavigate();
  const { login, loginFaceId } = useApp();
  const [method, setMethod] = useState('phone');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);

  function switchMethod(m) {
    setMethod(m); setValue(''); setPassword(''); setError(null);
  }

  function submit() {
    if (method === 'faceId') {
      setScanning(true); setError(null);
      setTimeout(() => { setScanning(false); loginFaceId(); navigate('/home'); }, 1000);
      return;
    }
    if (!value.trim() || !password) { setError('Please fill in all fields'); return; }
    if (!login(method, value.trim(), password).ok) {
      setError(`Incorrect ${LABEL[method].toLowerCase()} or password`);
      return;
    }
    setError(null);
    navigate('/home');
  }

  const hasError = Boolean(error);

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '32px', paddingInline: '24px', paddingTop: '40px' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '72px', justifyContent: 'center', width: '72px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M12 20s-7-4.5-9.5-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.5 5C19 15.5 12 20 12 20z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', display: 'flex', flexWrap: 'wrap', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, justifyContent: 'center', letterSpacing: '-0.02em', lineHeight: '36px', textAlign: 'center' }}>
          Welcome to UrbanCare
        </div>
        <div style={{ alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingInline: '24px' }}>
          <MicBar />
        </div>
      </div>

      <Tabs options={METHODS} value={method} onChange={switchMethod} />

      {hasError && (
        <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-error-tint)', borderColor: 'var(--color-error)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', marginTop: '16px', padding: '12px 16px', width: '342px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-error)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '18px' }}>
            {error}
          </div>
        </div>
      )}

      {method === 'faceId' ? (
        <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', padding: '16px', width: '342px' }}>
          <div style={{
            backgroundImage: 'url(https://app.paper.design/file-assets/01KZRP0Z5H214K6Z1EYJYNZZJK/01KZTK5317MVMD7QAZ4N9JK7YG.png)',
            backgroundPosition: '50%', backgroundSize: 'cover', borderRadius: 'var(--radius-card)', boxSizing: 'border-box',
            flexShrink: '0', height: '260px', width: '300px', opacity: scanning ? 0.55 : 1, transition: 'opacity 0.2s ease',
          }} />
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px', textAlign: 'center' }}>
            {scanning ? 'Scanning your face…' : 'Look at the camera to log in'}
          </div>
        </div>
      ) : (
        <>
          <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '14px', marginTop: '24px', padding: '16px', width: '342px' }}>
            <input
              value={value}
              onChange={(e) => { setValue(e.target.value); if (error) setError(null); }}
              placeholder={LABEL[method]}
              style={{ alignItems: 'center', backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '50px', paddingInline: '16px', width: '308px', outline: 'none', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', textAlign: 'center' }}
            />
          </div>

          <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '14px', marginTop: '24px', padding: '16px', width: '342px' }}>
            <div style={{ alignItems: 'center', backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '50px', paddingInline: '16px', width: '230px', gap: '8px' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-caption)', lineHeight: '18px', flexShrink: 0 }}>
                Password
              </div>
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(null); }}
                placeholder=".........."
                style={{ alignContent: 'center', background: 'transparent', border: 'none', boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', lineHeight: '24px', outline: 'none', textAlign: 'center', width: '100%', minWidth: 0 }}
              />
            </div>
            <div onClick={() => setShow((s) => !s)} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '48px', justifyContent: 'center', paddingInline: '10px', width: '71px', userSelect: 'none' }}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-card)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '18px' }}>
                {show ? 'Hide' : 'Show'}
              </div>
            </div>
          </div>
        </>
      )}

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <PrimaryButton onClick={submit} disabled={scanning}>{scanning ? 'Scanning…' : 'Log In'}</PrimaryButton>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Do not have an account?
        </div>
        <SecondaryButton onClick={() => navigate('/register')}>Register</SecondaryButton>
      </div>
    </>
  );
}
