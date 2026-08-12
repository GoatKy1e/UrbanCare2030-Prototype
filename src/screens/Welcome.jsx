import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { WelcomeWaveform } from '../components/VoiceBar';
import { useApp } from '../state/AppContext';
import { speak, stopSpeaking } from '../lib/speech';

const WELCOME_SCRIPT =
  'Welcome to UrbanCare. Would you like voice guidance turned on? ' +
  'Choose: Yes, turn it on. Or: No, continue without. ' +
  'You can also log in, register, or switch on colour-blind mode.';

// Ported from "00 Welcome voice over.js"
export default function Welcome() {
  const navigate = useNavigate();
  const { setVoiceGuidance, colorBlindMode, setColorBlindMode } = useApp();

  // This page always speaks, on or off — at this point we have no way of
  // knowing whether the user can see the choice we are asking them to make.
  useEffect(() => {
    speak(WELCOME_SCRIPT, { rate: 0.95 });
    return stopSpeaking;
  }, []);

  function choose(on) {
    stopSpeaking();
    setVoiceGuidance(on);
    navigate('/register');
  }

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
      </div>

      <WelcomeWaveform />

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '32px', paddingInline: '24px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', display: 'flex', flexWrap: 'wrap', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, justifyContent: 'center', lineHeight: '28px', textAlign: 'center' }}>
          Would you like voice guidance turned on?
        </div>
      </div>

      <PrimaryButton onClick={() => choose(true)}>
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="m5 12 5 5L20 7" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Yes, turn it on
      </PrimaryButton>

      <SecondaryButton onClick={() => choose(false)} style={{ marginTop: '12px' }}>
        No, continue without
      </SecondaryButton>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Already have an account?
        </div>
        <PrimaryButton onClick={() => navigate('/login')}>Log in</PrimaryButton>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Do not have an account?
        </div>
        <SecondaryButton onClick={() => navigate('/register')}>Register</SecondaryButton>
      </div>

      {/* Colour-vision accessibility: re-skins every screen in the app. */}
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Difficulty telling red and blue apart?
        </div>
        <div
          role="switch"
          aria-checked={colorBlindMode}
          tabIndex={0}
          onClick={() => setColorBlindMode(!colorBlindMode)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setColorBlindMode(!colorBlindMode); } }}
          style={{
            alignItems: 'center', alignSelf: 'center',
            backgroundColor: colorBlindMode ? 'var(--color-primary-tint)' : 'var(--color-card)',
            borderColor: colorBlindMode ? 'var(--color-primary)' : 'var(--color-border)',
            borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px',
            boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', gap: '12px',
            height: '58px', justifyContent: 'center', paddingInline: '16px', width: '342px', userSelect: 'none',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" fill="none" stroke={colorBlindMode ? 'var(--color-primary)' : 'var(--color-text-secondary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="none" stroke={colorBlindMode ? 'var(--color-primary)' : 'var(--color-text-secondary)'} strokeWidth="1.8" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: colorBlindMode ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '18px', fontWeight: 500, lineHeight: '22px' }}>
            Colour-blind mode
          </div>
          {/* Switch track */}
          <div style={{
            alignItems: 'center', backgroundColor: colorBlindMode ? 'var(--color-primary)' : 'var(--color-border)',
            borderRadius: '999px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '26px',
            padding: '3px', width: '48px', transition: 'background-color 0.3s ease',
          }}>
            <div style={{
              backgroundColor: '#FFFFFF', borderRadius: '999px', boxShadow: '#00000033 0px 1px 2px',
              boxSizing: 'border-box', height: '20px', width: '20px',
              transform: colorBlindMode ? 'translateX(22px)' : 'translateX(0)',
              transition: 'transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)',
            }} />
          </div>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px', textAlign: 'center', width: '342px' }}>
          {colorBlindMode
            ? 'On — the whole app now uses colours that stay distinct for red and blue colour blindness.'
            : 'Switches every screen to a colour-blind friendly palette.'}
        </div>
      </div>
    </>
  );
}
