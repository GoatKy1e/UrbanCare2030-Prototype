import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "04 Video Call (Loading/Successful).js" and
// "05 Teleconsultation (Loading/Call Connected).js" — identical apart from the title.

function fmt(sec) {
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
}

function ControlButton({ children, icon, danger, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center',
        backgroundColor: danger ? 'var(--color-error)' : active ? 'var(--color-primary-tint)' : 'var(--color-card)',
        borderColor: danger ? 'transparent' : active ? 'var(--color-primary)' : 'var(--color-border)',
        borderRadius: '12px', borderStyle: 'solid', borderWidth: danger ? 0 : '1px', boxSizing: 'border-box',
        cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', gap: '6px', height: '50px',
        justifyContent: 'center', userSelect: 'none',
      }}
    >
      {icon}
      <div style={{ boxSizing: 'border-box', color: danger ? '#FFFFFF' : active ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default function CallScreen({ title = 'Video Call' }) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds] = useState(252); // matches the 04:12 in the export
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!connected) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [connected]);

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div onClick={() => navigate('/home')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          {title}
        </div>
        <SpeakerButton />
      </div>

      {/* Video panel */}
      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: '#1F2937', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '12px', height: '300px', justifyContent: 'center', position: 'relative', width: '342px' }}>
        <div style={{ alignItems: 'center', backgroundColor: '#FFFFFF1F', borderRadius: '36px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '72px', justifyContent: 'center', width: '72px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <circle cx="12" cy="8" r="4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Dr Lim
        </div>
        <div style={{ boxSizing: 'border-box', color: '#FFFFFFB3', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          {connected ? `Connected · ${fmt(seconds)}` : 'Connecting.....'}
        </div>
        <div style={{ alignItems: 'center', backgroundColor: '#FFFFFF2E', borderRadius: '12px', bottom: '12px', boxSizing: 'border-box', display: 'flex', height: '100px', justifyContent: 'center', position: 'absolute', right: '12px', width: '76px' }}>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
            {cameraOff ? 'Off' : 'You'}
          </div>
        </div>
      </div>

      {/* Live caption */}
      <div style={{ alignItems: 'flex-start', alignSelf: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '16px', padding: '16px', width: '342px' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', justifyContent: 'center', paddingBlock: '4px', paddingInline: '8px' }}>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            CC
          </div>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          {connected ? '"And how long have you had the cough?"' : 'Waiting for the doctor to join…'}
        </div>
      </div>

      {/* Controls */}
      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '16px', width: '342px' }}>
        <ControlButton
          active={muted}
          onClick={() => setMuted((m) => !m)}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke={muted ? 'var(--color-primary)' : 'var(--color-text-primary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke={muted ? 'var(--color-primary)' : 'var(--color-text-primary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          {muted ? 'Unmute' : 'Mute'}
        </ControlButton>
        <ControlButton
          active={cameraOff}
          onClick={() => setCameraOff((c) => !c)}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke={cameraOff ? 'var(--color-primary)' : 'var(--color-text-primary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m16 10 5-3v10l-5-3z" fill="none" stroke={cameraOff ? 'var(--color-primary)' : 'var(--color-text-primary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          Camera
        </ControlButton>
        <ControlButton danger onClick={() => navigate('/home')}>End</ControlButton>
      </div>

      {/* Chat entry */}
      <div
        onClick={() => setChatOpen((c) => !c)}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', gap: '12px', height: '50px', marginTop: '16px', paddingInline: '16px', width: '342px' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 21 12z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          Type to the doctor instead
        </div>
      </div>

      {chatOpen && (
        <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px', marginTop: '12px', width: '342px' }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message…"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', flex: 1, fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', height: '46px', outline: 'none', paddingInline: '14px' }}
          />
          <div onClick={() => setMessage('')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', height: '46px', justifyContent: 'center', paddingInline: '18px' }}>
            <div style={{ color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500 }}>Send</div>
          </div>
        </div>
      )}

      {/* Records notice */}
      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-success-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '16px', padding: '16px', width: '342px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          Summary &amp; e-prescription sent to your records after the call
        </div>
      </div>
    </>
  );
}
