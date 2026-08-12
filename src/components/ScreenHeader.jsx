import { useNavigate } from 'react-router-dom';
import ProgressTrack from './ProgressTrack';
import SpeakerButton from './SpeakerButton';

/**
 * Shared screen header: step label, then the UrbanCare logo beside the title,
 * with an optional speaker button and step progress track.
 *
 * Navigation: the small chevron (when present) goes back one step, and the
 * logo goes to `logoTo` — Home inside the app, the Welcome page during signup.
 */
export default function ScreenHeader({
  stepLabel,
  onBack,
  title,
  logoTo = '/home',
  progress,
  speaker = true,
}) {
  const navigate = useNavigate();

  return (
    <>
      {stepLabel && (
        <div style={{ alignItems: 'center', alignSelf: 'center', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: 'var(--spacing-sm)', height: '20px', width: '342px' }}>
          {onBack && (
            <div
              onClick={onBack}
              title="Back to previous step"
              style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                <path d="m15 5-7 7 7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            {stepLabel}
          </div>
        </div>
      )}

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div
          onClick={() => navigate(logoTo)}
          title={logoTo === '/' ? 'Back to welcome page' : 'Back to home'}
          style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}
        >
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, height: 'fit-content', letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          {title}
        </div>
        {speaker && <SpeakerButton />}
      </div>

      {progress && <ProgressTrack fill={progress} />}
    </>
  );
}
