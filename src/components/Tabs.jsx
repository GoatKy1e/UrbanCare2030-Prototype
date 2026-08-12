// Segmented tab strip, ported verbatim from the Paper exports.
export default function Tabs({ options, value, onChange, width = '342px' }) {
  return (
    <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '6px', padding: '6px', width }}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <div
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={active
              ? { alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderColor: 'var(--color-primary)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '4px', userSelect: 'none' }
              : { alignItems: 'center', borderRadius: 'var(--radius-card)', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '4px', userSelect: 'none' }}
          >
            <div style={active
              ? { boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }
              : { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}
            >
              {opt.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { default as ProgressBar } from './ProgressTrack';
