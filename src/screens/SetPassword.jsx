import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import ProgressTrack from '../components/ProgressTrack';
import MicBar from '../components/VoiceBar';
import { PrimaryButton } from '../components/Buttons';
import { useApp } from '../state/AppContext';

// Ported from "00b Set Up Password (Success).js" and "00b Set Up Password (Error).js"

function strengthOf(pw) {
  if (!pw) return { label: '', color: 'var(--color-text-secondary)', fill: '0px', level: 0 };
  const strong = pw.length >= 8 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw);
  return strong
    ? { label: 'Strong Password', color: 'var(--color-success)', fill: '247px', level: 2 }
    : { label: 'Weak Password', color: 'var(--color-error)', fill: '96px', level: 1 };
}

function PasswordField({ label, value, onChange, show, onToggleShow, error }) {
  return (
    <div style={{
      alignItems: 'center', alignSelf: 'center', backgroundColor: error ? 'var(--color-error-tint)' : 'var(--color-card)',
      borderColor: error ? 'var(--color-error)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px',
      boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '14px',
      marginTop: '24px', padding: '16px', width: '342px',
      transition: 'background-color 0.35s ease, border-color 0.35s ease',
    }}>
      <div style={{ alignItems: 'center', backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '50px', paddingInline: '16px', width: '230px', gap: '8px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-caption)', lineHeight: '18px', flexShrink: 0 }}>
          {label}
        </div>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder=".........."
          style={{
            alignContent: 'center', background: 'transparent', border: 'none', boxSizing: 'border-box', color: 'var(--color-text-secondary)',
            fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', lineHeight: '24px', outline: 'none', textAlign: 'center', width: '100%', minWidth: 0,
          }}
        />
      </div>
      <div
        onClick={onToggleShow}
        style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '48px', justifyContent: 'center', paddingInline: '10px', width: '71px', userSelect: 'none' }}
      >
        <div style={{ boxSizing: 'border-box', color: 'var(--color-card)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '18px' }}>
          {show ? 'Hide' : 'Show'}
        </div>
      </div>
    </div>
  );
}

export default function SetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useApp();
  const { method, value } = location.state || { method: 'phone', value: '' };

  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [completed, setCompleted] = useState(false);

  const strength = useMemo(() => strengthOf(pw), [pw]);

  // Live mismatch feedback once the user has started confirming.
  const mismatch = confirm.length > 0 && confirm !== pw;

  // The strength bar goes red the moment the two fields disagree.
  const barColor = mismatch ? 'var(--color-error)' : strength.color;
  const barFill = mismatch ? '342px' : strength.fill;
  const statusLabel = mismatch ? 'Passwords do not match' : (submitError || strength.label);
  const statusColor = mismatch || submitError ? 'var(--color-error)' : strength.color;

  function submit() {
    if (completed) return;
    if (!pw || !confirm) { setSubmitError('Please fill in both password fields'); return; }
    if (pw !== confirm) { setSubmitError('Passwords do not match'); return; }
    setSubmitError(null);

    if (strength.level < 2) {
      navigate('/register/result', { state: { success: false, method, value } });
      return;
    }

    // Only now does the step bar go green — then a beat so it is visible.
    setCompleted(true);
    register(method, value, pw);
    setTimeout(() => navigate('/register/result', { state: { success: true } }), 700);
  }

  return (
    <>
      <ScreenHeader
        stepLabel="Step 2 of 2"
        onBack={() => navigate('/register')}
        title="Select Your Password"
        logoTo="/"
        speaker={false}
      />

      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', paddingInline: '24px' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingInline: '24px' }}>
          <MicBar />
        </div>
      </div>

      {/* Step progress: blue throughout, green only once registration completes. */}
      <ProgressTrack fill="342px" color={completed ? 'var(--color-success)' : 'var(--color-primary)'} />

      <PasswordField
        label="New Password"
        value={pw}
        onChange={(e) => { setPw(e.target.value); if (submitError) setSubmitError(null); }}
        show={show}
        onToggleShow={() => setShow((s) => !s)}
      />
      <PasswordField
        label="Confirm Password"
        value={confirm}
        onChange={(e) => { setConfirm(e.target.value); if (submitError) setSubmitError(null); }}
        show={show}
        onToggleShow={() => setShow((s) => !s)}
        error={mismatch}
      />

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '6px', justifyContent: 'center', paddingInline: '24px', marginTop: '10px' }}>
        <div
          key={statusLabel}
          className={statusLabel ? 'fade-in' : undefined}
          style={{
            boxSizing: 'border-box', color: statusColor, fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '14px', fontWeight: mismatch ? 700 : 400, lineHeight: '18px', minHeight: '18px', width: '337px',
            transition: 'color 0.35s ease',
          }}
        >
          {statusLabel}
        </div>
        <ProgressTrack fill={barFill} color={barColor} />
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <PrimaryButton
          onClick={submit}
          disabled={completed}
          style={completed ? { backgroundColor: 'var(--color-success)', opacity: 1, transition: 'background-color 0.4s ease' } : undefined}
        >
          {completed ? 'Registered ✓' : 'Complete Registration'}
        </PrimaryButton>
      </div>
    </>
  );
}
