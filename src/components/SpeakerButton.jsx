import { useApp } from '../state/AppContext';

// Speaker path data split out of the Paper exports so the sound waves can be
// dropped when voice guidance is muted.
const BODY = 'M0.65 18.36L0.35 18.61H0.25C0.195 18.61 0.15 18.655 0.15 18.71V18.91C0.15 18.965 0.195 19.01 0.25 19.01H0.35L0.65 19.26V18.36Z';
const WAVES = 'M0.8 18.66C0.825 18.685 0.85 18.735 0.85 18.81 0.85 18.885 0.825 18.935 0.8 18.96M0.95 18.51C1.025 18.585 1.05 18.71 1.05 18.81 1.05 18.91 1.025 19.035 0.95 19.11';

/**
 * The header speaker icon, as an on/off switch for voice guidance.
 * Starts ON; muting greys the icon, drops the sound waves and adds a slash.
 */
export default function SpeakerButton() {
  const { voiceGuidance, setVoiceGuidance } = useApp();
  const on = voiceGuidance;
  const stroke = on ? 'var(--color-primary)' : 'var(--color-text-secondary)';

  return (
    <div
      role="switch"
      aria-checked={on}
      aria-label={on ? 'Voice guidance on' : 'Voice guidance muted'}
      title={on ? 'Voice guidance on — tap to mute' : 'Muted — tap to turn voice guidance on'}
      tabIndex={0}
      onClick={() => setVoiceGuidance(!on)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVoiceGuidance(!on); } }}
      style={{
        alignItems: 'center', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer',
        display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px',
        userSelect: 'none', transition: 'opacity 0.2s ease',
      }}
    >
      <svg width="40" height="40" viewBox="0 18.21 1.2 1.2" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
        <path d={BODY} fill="none" stroke={stroke} strokeWidth="0.075" strokeLinecap="round" strokeLinejoin="round" />
        {on ? (
          <path d={WAVES} fill="none" stroke={stroke} strokeWidth="0.075" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M0.78 18.5 L1.08 19.12" fill="none" stroke="var(--color-error)" strokeWidth="0.075" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}
