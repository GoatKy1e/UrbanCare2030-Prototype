import { useEffect, useState } from 'react';

/**
 * The 342x8 step progress track.
 *
 * The fill animates up from zero when the screen mounts, so arriving on a step
 * visibly advances the bar, and eases whenever the width or colour changes.
 */
export default function ProgressTrack({ fill, color = 'var(--color-primary)' }) {
  const [width, setWidth] = useState('0px');

  useEffect(() => {
    // A short timer (rather than rAF) lets the browser paint 0 first and then
    // transition to `fill`, and still resolves when the tab is backgrounded —
    // rAF is suspended while hidden, which would leave the bar stuck empty.
    const id = setTimeout(() => setWidth(fill), 40);
    return () => clearTimeout(id);
  }, [fill]);

  return (
    <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '8px', overflow: 'hidden', width: '342px' }}>
      <div
        style={{
          backgroundColor: color,
          borderRadius: '12px',
          boxSizing: 'border-box',
          flexShrink: '0',
          height: '8px',
          width,
          transition: 'width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), background-color 0.4s ease',
        }}
      />
    </div>
  );
}
