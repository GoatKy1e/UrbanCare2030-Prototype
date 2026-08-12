import { useEffect, useRef, useState } from 'react';

// Waveform + mic markup ported verbatim from the Paper exports.
// Bar heights cycle through this sequence in every source file.
const HEIGHTS = [12, 22, 30, 18, 26, 14, 20];
const PULSE_MS = 3000;

function bars(count) {
  return Array.from({ length: count }, (_, i) => HEIGHTS[i % HEIGHTS.length]);
}

/** The bare waveform: 28 bars, 275px wide (used inside the mic bar). */
export function Waveform({ count = 28, width = '275px', pulsing = false }) {
  return (
    <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', height: '32px', justifyContent: 'center', width }}>
      {bars(count).map((h, i) => (
        <div
          key={i}
          className="voice-bar"
          style={{
            backgroundColor: 'var(--color-primary)',
            borderRadius: '12px',
            boxSizing: 'border-box',
            flexShrink: '0',
            height: `${h}px`,
            width: '5px',
            transformOrigin: 'center',
            // Staggered start makes the pulse travel gently across the bars.
            animation: pulsing ? `voicePulse 0.85s ease-in-out ${i * 0.045}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  );
}

/** Standalone 14-bar waveform used on the Welcome screen (no mic, no border). */
export function WelcomeWaveform() {
  return (
    <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', height: '32px', justifyContent: 'center', paddingBottom: '16px' }}>
      {bars(14).map((h, i) => (
        <div key={i} style={{ backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', flexShrink: '0', height: `${h}px`, width: '5px' }} />
      ))}
    </div>
  );
}

export function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The 342x50 mic bar from the Paper exports. Tapping it listens: the waveform
 * pulses gently for 3 seconds and then settles. There is no muted state here —
 * muting lives on the speaker button in the header.
 */
export default function MicBar() {
  const [pulsing, setPulsing] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function listen() {
    clearTimeout(timer.current);
    setPulsing(true);
    timer.current = setTimeout(() => setPulsing(false), PULSE_MS);
  }

  return (
    <div
      role="button"
      aria-label="Speak your request"
      tabIndex={0}
      onClick={listen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); listen(); } }}
      style={{
        alignItems: 'center', alignSelf: 'center',
        backgroundColor: pulsing ? 'var(--color-primary-tint)' : 'var(--color-card)',
        borderColor: pulsing ? 'var(--color-primary)' : 'var(--color-border)',
        borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box',
        cursor: 'pointer', display: 'flex', flexShrink: '0', gap: '12px', height: '50px',
        paddingInline: '16px', width: '342px', userSelect: 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <MicIcon />
      <Waveform pulsing={pulsing} />
    </div>
  );
}
