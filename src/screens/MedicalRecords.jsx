import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import { doctors } from '../data/doctors';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "08 Medical records.js"

const TABS = [
  { value: 'summary', label: 'Summary' },
  { value: 'past', label: 'Past' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'docs', label: 'Docs' },
];

const statCard = {
  backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
  borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column',
  flexGrow: '1', gap: '4px', padding: '16px',
};
const statLabel = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };
const statValue = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' };
const sectionHead = { alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' };
const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' };
const vitalCard = { ...statCard, gap: '2px', paddingBlock: '16px', paddingInline: '12px' };

export default function MedicalRecords() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('summary');
  const [shared, setShared] = useState(false);

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div onClick={() => navigate('/home')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          Records
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

      {tab !== 'summary' ? (
        <div style={{ alignSelf: 'center', boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px', paddingBlock: '48px', textAlign: 'center', width: '342px' }}>
          No {tab} records yet.
        </div>
      ) : (
        <>
          <div style={sectionHead}><div style={sectionTitle}>At a glance</div></div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', width: '342px' }}>
            <div style={statCard}>
              <div style={statLabel}>Conditions</div>
              <div style={statValue}>Mild hypertension</div>
            </div>
            <div style={{ ...statCard, backgroundColor: 'var(--color-error-tint)', borderColor: 'var(--color-error)' }}>
              <div style={{ ...statLabel, color: 'var(--color-error)' }}>Allergies</div>
              <div style={{ ...statValue, color: 'var(--color-error)' }}>Penicillin</div>
            </div>
          </div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '12px', width: '342px' }}>
            <div style={statCard}>
              <div style={statLabel}>Medicines</div>
              <div style={statValue}>3 ongoing</div>
            </div>
            <div style={statCard}>
              <div style={statLabel}>Next visit</div>
              <div style={statValue}>Mon 14 Jul</div>
            </div>
          </div>

          <div style={sectionHead}><div style={sectionTitle}>Latest vitals</div></div>
          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', width: '342px' }}>
            <div style={vitalCard}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>72</div>
              <div style={statLabel}>bpm</div>
            </div>
            <div style={vitalCard}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>118/76</div>
              <div style={statLabel}>BP</div>
            </div>
            <div style={vitalCard}>
              <div style={{ boxSizing: 'border-box', color: 'var(--color-error)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>High</div>
              <div style={statLabel}>Glucose</div>
            </div>
          </div>

          <div style={sectionHead}><div style={sectionTitle}>Care team</div></div>
          {['lim', 'tan'].map((id, i) => {
            const d = doctors.find((x) => x.id === id);
            return (
              <div key={id} style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: i ? '8px' : 0, paddingBlock: '14px', paddingInline: '16px', width: '342px' }}>
                <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <circle cx="12" cy="8" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
                  <div style={statValue}>{d.name}</div>
                  <div style={statLabel}>{d.specialty}</div>
                </div>
                <div
                  onClick={() => navigate(`/doctor/${d.id}`)}
                  style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', justifyContent: 'center', paddingBlock: '8px', paddingInline: '14px' }}
                >
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-background)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
                    Profile
                  </div>
                </div>
              </div>
            );
          })}

          <div
            onClick={() => setShared(true)}
            style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: shared ? 'var(--color-success)' : 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
          >
            <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
              {shared ? 'Shared securely ✓' : 'Share with a doctor'}
            </div>
          </div>
        </>
      )}
    </>
  );
}
