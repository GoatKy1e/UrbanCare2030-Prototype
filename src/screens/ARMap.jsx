import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "07 AR hospital map.js"

export default function ARMap() {
  const navigate = useNavigate();
  const [twoD, setTwoD] = useState(false);
  const [guide, setGuide] = useState('idle'); // idle | connecting | connected

  function callGuide() {
    if (guide !== 'idle') return;
    setGuide('connecting');
    setTimeout(() => setGuide('connected'), 1600);
  }

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div onClick={() => navigate(-1)} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          AR Map
        </div>
        <SpeakerButton />
      </div>

      <MicBar />

      {/* AR viewport */}
      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: twoD ? '#E8EDF4' : '#1F2937', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '24px', height: '380px', justifyContent: 'center', marginTop: '16px', position: 'relative', width: '342px' }}>
        {twoD ? (
          <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <rect x="20" y="20" width="160" height="160" rx="8" fill="#FFFFFF" stroke="var(--color-border)" strokeWidth="2" />
            <rect x="34" y="34" width="60" height="52" fill="#DCE6F5" />
            <rect x="106" y="34" width="60" height="52" fill="#DCE6F5" />
            <rect x="34" y="112" width="132" height="54" fill="#DCE6F5" />
            <circle cx="100" cy="100" r="7" fill="var(--color-primary)" />
            <path d="M100 100 L150 60" stroke="var(--color-error)" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="150" cy="60" r="6" fill="var(--color-error)" />
          </svg>
        ) : (
          <svg width="140" height="180" viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M70 12 L124 84 L96 84 L96 168 L44 168 L44 84 L16 84 Z" fill="#2F80ED" stroke="#7FB2F5" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        )}
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ boxSizing: 'border-box', color: twoD ? 'var(--color-text-primary)' : '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, lineHeight: '28px' }}>
            Cardiology
          </div>
          <div style={{ boxSizing: 'border-box', color: twoD ? 'var(--color-text-secondary)' : '#FFFFFFBF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
            40 m ahead · Level 2
          </div>
        </div>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px', left: '16px', position: 'absolute', top: '16px' }}>
          <div style={{ backgroundColor: 'var(--color-error)', borderRadius: '12px', boxSizing: 'border-box', flexShrink: '0', height: '8px', width: '8px' }} />
          <div style={{ boxSizing: 'border-box', color: twoD ? 'var(--color-text-secondary)' : '#FFFFFFCC', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
            {twoD ? 'Floor plan' : 'Live camera'}
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '16px', padding: '16px', width: '342px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M11 5 6 9H3v6h3l5 4zM16 9a4 4 0 0 1 0 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
          "In 10 metres, turn right toward the lift"
        </div>
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '16px', width: '342px' }}>
        <div
          onClick={() => setTwoD((v) => !v)}
          style={{ alignItems: 'center', backgroundColor: twoD ? 'var(--color-primary-tint)' : 'var(--color-card)', borderColor: twoD ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '50px', justifyContent: 'center' }}
        >
          <div style={{ boxSizing: 'border-box', color: twoD ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            {twoD ? 'Live camera' : '2D map'}
          </div>
        </div>
        <div
          onClick={callGuide}
          style={{ alignItems: 'center', backgroundColor: guide === 'connected' ? 'var(--color-success-tint)' : 'var(--color-card)', borderColor: guide === 'connected' ? 'var(--color-success)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '50px', justifyContent: 'center' }}
        >
          <div style={{ boxSizing: 'border-box', color: guide === 'connected' ? 'var(--color-success)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            {guide === 'idle' ? 'Call a guide' : guide === 'connecting' ? 'Connecting…' : 'Guide on the way'}
          </div>
        </div>
      </div>
    </>
  );
}
