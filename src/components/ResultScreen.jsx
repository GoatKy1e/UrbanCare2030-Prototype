import { PrimaryButton, GhostLink } from './Buttons';

// Ported from "00c Registration Successful/Unsuccessful.js" and
// "02e Appointment Successful/Unsuccessful.js" — these four share one template.
export default function ResultScreen({ success, heading, badgeTitle, badgeSubtitle, ctaLabel, onCta, secondaryLabel, onSecondary }) {
  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', paddingBottom: '32px', paddingInline: '24px', paddingTop: '26px' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '72px', justifyContent: 'center', width: '72px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M12 20s-7-4.5-9.5-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.5 5C19 15.5 12 20 12 20z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '48px', justifyContent: 'center', paddingInline: '12px', width: '316px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', display: 'flex', flexShrink: '0', flexWrap: 'wrap', fontFamily: '"Inter", system-ui, sans-serif', fontSize: success ? '30px' : '26px', fontWeight: 600, height: 'fit-content', justifyContent: 'center', letterSpacing: '-0.02em', lineHeight: success ? '36px' : '32px', textAlign: 'center', width: '295px' }}>
            {heading}
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: success ? 'var(--color-success)' : 'var(--color-error)', borderRadius: '100px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '4px', height: '200px', paddingTop: 'var(--spacing-md)', width: '200px' }}>
        {success ? (
          <svg width="66" height="63" viewBox="0 -44.727 72 68.727" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M15-10.364l15 14.319L60-24.682" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="66" height="63" viewBox="0 23.101 2.538 2.1" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M2.48 23.014C2.392 22.924 2.236 22.924 2.149 23.014L1.286 23.833L0.424 23.014C0.337 22.924 0.179 22.924 0.093 23.014C-0.012 23.101 -0.012 23.246 0.093 23.339L0.947 24.155L0.093 24.98C-0.012 25.064 -0.012 25.21 0.093 25.297C0.179 25.393 0.337 25.393 0.424 25.297L1.286 24.487L2.149 25.297C2.236 25.393 2.392 25.393 2.48 25.297C2.576 25.21 2.576 25.064 2.48 24.98L1.626 24.155L2.48 23.339C2.576 23.246 2.576 23.101 2.48 23.014Z" fill="var(--color-background)" />
          </svg>
        )}
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '0.02em', lineHeight: '36px' }}>
          {badgeTitle}
        </div>
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          {badgeSubtitle}
        </div>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', paddingBottom: '10px', paddingInline: '24px', paddingTop: '32px' }}>
        <PrimaryButton onClick={onCta}>{ctaLabel}</PrimaryButton>
        {secondaryLabel && <GhostLink onClick={onSecondary}>{secondaryLabel}</GhostLink>}
      </div>
    </>
  );
}
