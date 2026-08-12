import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "06 Map and pharmacy.js"

const PLACES = [
  {
    id: 'city-general', name: 'City General Hospital', type: 'hospital', meta: '2.1 km · 24 hours · A&E open',
    tint: 'var(--color-error-tint)', stroke: 'var(--color-error)', border: 'var(--color-border)', metaColor: 'var(--color-text-secondary)',
    icon: (c) => (<><path d="M4 21V8l8-5 8 5v13" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 10v6M9 13h6" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>),
  },
  {
    id: 'bukit-jalil', name: 'Bukit Jalil Clinic', type: 'clinic', meta: '0.9 km · open · walk-in',
    tint: 'var(--color-primary-tint)', stroke: 'var(--color-primary)', border: 'var(--color-border)', metaColor: 'var(--color-text-secondary)',
    icon: (c) => (<path d="M12 20s-7-4.5-9.5-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.5 5C19 15.5 12 20 12 20z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />),
  },
  {
    id: 'community-pharmacy', name: 'Community Pharmacy', type: 'pharmacy', meta: '0.4 km · your medicine in stock',
    tint: 'var(--color-success-tint)', stroke: 'var(--color-secondary)', border: 'var(--color-secondary)', metaColor: 'var(--color-secondary)',
    icon: (c) => (<><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 8.5 15.5 15.5" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>),
  },
];

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'pharmacy', label: 'Pharmacy' },
];

export default function MapPharmacy() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [listView, setListView] = useState(false);
  const [selected, setSelected] = useState('city-general');

  const visible = tab === 'all' ? PLACES : PLACES.filter((p) => p.type === tab);

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div onClick={() => navigate('/home')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          Nearest Care
        </div>
        <SpeakerButton />
      </div>

      <MicBar />

      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '6px', marginTop: '16px', padding: '6px', width: '342px' }}>
        {TABS.map((t) => {
          const active = t.value === tab;
          return (
            <div
              key={t.value}
              onClick={() => setTab(t.value)}
              style={active
                ? { alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderColor: 'var(--color-primary)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '4px' }
                : { alignItems: 'center', borderRadius: 'var(--radius-card)', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '4px' }}
            >
              <div style={active
                ? { boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }
                : { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}
              >
                {t.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map canvas with pins */}
      {!listView && (
        <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: '#E8EDF4', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '32px', height: '180px', justifyContent: 'center', marginTop: '16px', width: '342px' }}>
          {[
            { id: 'city-general', fill: 'var(--color-error)' },
            { id: 'bukit-jalil', fill: 'var(--color-primary)' },
            { id: 'community-pharmacy', fill: 'var(--color-secondary)' },
          ].map((pin) => (
            <svg
              key={pin.id}
              onClick={() => setSelected(pin.id)}
              width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: '0', cursor: 'pointer', transform: selected === pin.id ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.15s ease' }}
            >
              <path d="M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" fill={pin.fill} />
              <circle cx="12" cy="10" r="2.6" fill="#FFFFFF" />
            </svg>
          ))}
        </div>
      )}

      <div style={{ alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' }}>
          Nearby
        </div>
        <div onClick={() => setListView((v) => !v)} style={{ boxSizing: 'border-box', color: 'var(--color-primary)', cursor: 'pointer', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
          {listView ? 'Map view' : 'List view'}
        </div>
      </div>

      {visible.map((p, i) => (
        <div
          key={p.id}
          onClick={() => setSelected(p.id)}
          style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: selected === p.id ? 'var(--color-primary)' : p.border, borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', gap: '12px', marginTop: i ? '8px' : 0, paddingBlock: '14px', paddingInline: '16px', width: '342px' }}
        >
          <div style={{ alignItems: 'center', backgroundColor: p.tint, borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              {p.icon(p.stroke)}
            </svg>
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
            <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
              {p.name}
            </div>
            <div style={{ boxSizing: 'border-box', color: p.metaColor, fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
              {p.meta}
            </div>
          </div>
        </div>
      ))}

      {!visible.length && (
        <div style={{ alignSelf: 'center', boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', paddingBlock: '16px', textAlign: 'center', width: '342px' }}>
          Nothing nearby in this category.
        </div>
      )}

      <div
        onClick={() => navigate('/ar-map')}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Get directions
        </div>
      </div>
    </>
  );
}
