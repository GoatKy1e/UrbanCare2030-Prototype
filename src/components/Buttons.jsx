// 342x58 CTA buttons, ported verbatim from the Paper exports.

export function PrimaryButton({ children, style, disabled, danger, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled && props.onClick) props.onClick(e); }}
      {...props}
      onClick={disabled ? undefined : props.onClick}
      style={{
        alignItems: 'center', alignSelf: 'center', backgroundColor: danger ? 'var(--color-error)' : 'var(--color-primary)',
        borderRadius: '12px', boxShadow: '#00000033 0px 2px 3px, #00000033 0px 2px 3px', boxSizing: 'border-box',
        display: 'flex', flexShrink: '0', gap: '10px', height: '58px', justifyContent: 'center', width: '342px',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, userSelect: 'none',
        ...style,
      }}
    >
      <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {children}
      </div>
    </div>
  );
}

export function SecondaryButton({ children, style, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      {...props}
      style={{
        alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)',
        borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box',
        display: 'flex', flexShrink: '0', gap: '10px', height: '58px', justifyContent: 'center', width: '342px',
        cursor: 'pointer', userSelect: 'none', ...style,
      }}
    >
      <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
        {children}
      </div>
    </div>
  );
}

/** The small pill buttons used inside cards (Directions / AR Map / Profile / Book...). */
export function PillButton({ children, icon, ghost, style, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      {...props}
      style={{
        alignItems: 'center', backgroundColor: ghost ? 'var(--color-card)' : 'var(--color-primary)',
        borderColor: 'var(--color-border)', borderStyle: ghost ? 'solid' : 'none', borderWidth: ghost ? '1px' : '0',
        borderRadius: '12px', boxSizing: 'border-box', display: 'flex', gap: '6px', justifyContent: 'center',
        paddingBlock: '8px', paddingInline: '14px', width: 'fit-content', cursor: 'pointer', userSelect: 'none', ...style,
      }}
    >
      {icon}
      <div style={{ boxSizing: 'border-box', color: ghost ? 'var(--color-text-primary)' : 'var(--color-card)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
        {children}
      </div>
    </div>
  );
}

export function GhostLink({ children, style, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      {...props}
      style={{ boxSizing: 'border-box', color: 'var(--color-primary)', cursor: 'pointer', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px', textDecoration: 'underline', userSelect: 'none', ...style }}
    >
      {children}
    </div>
  );
}
