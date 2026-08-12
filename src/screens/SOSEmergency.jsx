import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "09 SOS Emergency.js"

const HOLD_MS = 3000;
const infoRow = {
  alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '12px',
  paddingBlock: '14px', paddingInline: '16px',
};
const infoText = { boxSizing: 'border-box', color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' };

export default function SOSEmergency() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [silentChat, setSilentChat] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  function startHold() {
    if (sent) return;
    startRef.current = Date.now();
    const tick = () => {
      const pct = Math.min(1, (Date.now() - startRef.current) / HOLD_MS);
      setProgress(pct);
      if (pct >= 1) { setSent(true); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function cancelHold() {
    if (sent) return;
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
  }

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingInline: '24px', paddingTop: '8px' }}>
        <div onClick={() => navigate('/home')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, height: 'fit-content', letterSpacing: '-0.02em', lineHeight: '36px', width: '153px' }}>
          Emergency
        </div>
        <SpeakerButton />
      </div>

      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingBottom: '24px', paddingInline: '24px', paddingTop: '8px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Hold the button, or say "Emergency"
        </div>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingInline: '24px' }}>
          <MicBar />
        </div>
      </div>

      {/* HOLD button — conic ring fills over 3s */}
      <div
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        style={{
          alignItems: 'center', alignSelf: 'center', borderRadius: '100px', boxSizing: 'border-box', cursor: 'pointer',
          display: 'flex', flexShrink: '0', height: '208px', justifyContent: 'center', width: '208px', userSelect: 'none',
          background: `conic-gradient(var(--color-success) ${progress * 360}deg, transparent 0deg)`,
        }}
      >
        <div style={{ alignItems: 'center', backgroundColor: sent ? 'var(--color-success)' : 'var(--color-error)', borderRadius: '100px', boxShadow: '#00000033 3px 5px 6px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '4px', height: '200px', justifyContent: 'center', width: '200px' }}>
          {sent ? (
            <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="M5 13l4 4L19 7" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="M12 3 3 7v5c0 5 4 8 9 9 5-1 9-4 9-9V7z" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8v4M12 16h.01" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '0.02em', lineHeight: '36px' }}>
            {sent ? 'SENT' : 'HOLD'}
          </div>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
            {sent ? 'Help is on the way' : progress > 0 ? `${Math.ceil((1 - progress) * 3)} seconds` : '3 seconds'}
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', paddingInline: '24px', paddingTop: '16px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          {sent ? 'Location, allergies & conditions shared' : 'Let go to cancel — no accidental calls'}
        </div>
      </div>

      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '8px', marginTop: '32px', width: '342px' }}>
        <div style={infoRow}>
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.5" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={infoText}>Shares your live location</div>
        </div>
        <div style={infoRow}>
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={infoText}>Sends allergies &amp; conditions</div>
        </div>
        <div style={infoRow}>
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <circle cx="12" cy="8" r="4" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={infoText}>Alerts your caregiver</div>
        </div>
      </div>

      <div
        onClick={() => setSilentChat((s) => !s)}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: silentChat ? 'var(--color-primary-tint)' : 'var(--color-card)', borderColor: silentChat ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px', paddingBlock: '14px', paddingInline: '16px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
          Can't speak?
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          A silent chat to the dispatcher opens
        </div>
      </div>

      {silentChat && (
        <div style={{ alignSelf: 'center', backgroundColor: 'var(--color-primary-tint)', borderColor: 'var(--color-primary)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px', marginTop: '8px', padding: '14px', width: '342px' }}>
          Silent chat opened. A dispatcher is reading — type your emergency details.
        </div>
      )}
    </>
  );
}
