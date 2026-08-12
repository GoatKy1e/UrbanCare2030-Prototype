import StatusBar from './StatusBar';

/**
 * Device shell. The inner column reproduces the outer container from the
 * Paper exports: 390px wide, background, paddingBottom 32px, overflow clip.
 */
export default function PhoneFrame({ children, time = '9:41' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingBlock: '24px' }}>
      <div style={{ border: '8px solid #14151A', borderRadius: '44px', boxShadow: '0 20px 60px rgba(16, 24, 40, 0.25)', overflow: 'hidden' }}>
        <div className="no-scrollbar" style={{
          backgroundColor: 'var(--color-background)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
          fontSynthesis: 'none', height: '780px', MozOsxFontSmoothing: 'grayscale', overflowY: 'auto', overflowX: 'clip',
          paddingBottom: '32px', WebkitFontSmoothing: 'antialiased', width: '390px',
        }}>
          <StatusBar time={time} />
          {children}
        </div>
      </div>
    </div>
  );
}
