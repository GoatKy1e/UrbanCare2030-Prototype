import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import SpeakerButton from '../components/SpeakerButton';
import { doctors } from '../data/doctors';
import { DOC_FILTERS, documents, initialDoses, medications, visits } from '../data/records';

// Ported from "08 Medical records.js", with the Bookings and Medicine tabs
// built to the supplied templates.

const TABS = [
  { value: 'summary', label: 'Summary' },
  { value: 'bookings', label: 'Bookings' },
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
const sectionHead = { alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' };
const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' };
const vitalCard = { ...statCard, gap: '2px', paddingBlock: '16px', paddingInline: '12px' };
const rowCard = {
  alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)',
  borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex',
  gap: '12px', paddingBlock: '14px', paddingInline: '16px', width: '342px',
};

const PillIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
    <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 8.5 15.5 15.5" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function AccentIconBox({ children }) {
  return (
    <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
      {children}
    </div>
  );
}

/** Small outlined status pill ("Ongoing", "Taken", "Open →"). */
function StatusPill({ children, accent, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center', borderColor: accent ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '8px',
        borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', color: accent ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        cursor: onClick ? 'pointer' : 'default', display: 'flex', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: '13px', fontWeight: 500, justifyContent: 'center', paddingBlock: '5px', paddingInline: '10px', userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
}

export default function MedicalRecords() {
  const navigate = useNavigate();
  const location = useLocation();
  // The Home "Next medication" card deep-links straight to Medicine.
  const [tab, setTab] = useState(location.state?.tab || 'summary');
  const [shared, setShared] = useState(false);
  const [doses, setDoses] = useState(initialDoses);
  const [docFilter, setDocFilter] = useState('all');

  const visibleDocs = docFilter === 'all' ? documents : documents.filter((d) => d.kind === docFilter);

  const doneCount = doses.filter((d) => d.taken).length;

  function toggleDose(id) {
    setDoses((prev) => prev.map((d) => (d.id === id ? { ...d, taken: !d.taken } : d)));
  }

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

      {/* ------------------------------------------------ Bookings */}
      {tab === 'bookings' && (
        <>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px', paddingBlock: '16px', paddingInline: '24px' }}>
            Tap an appointment to open its full report
          </div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', width: '342px' }}>
            {visits.map((v) => (
              <div
                key={v.id}
                onClick={() => navigate(`/records/visit/${v.id}`)}
                style={{ ...rowCard, alignItems: 'flex-start', cursor: 'pointer', width: '100%' }}
              >
                <AccentIconBox>
                  {v.mode === 'Video' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                      <rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m16 10 5-3v10l-5-3z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                      <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </AccentIconBox>
                <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>
                    {v.date} · {v.doctor}
                  </div>
                  <div style={statLabel}>{v.specialty} · {v.mode} · {v.summary}</div>
                </div>
                <StatusPill accent>Open →</StatusPill>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ------------------------------------------------ Medicine */}
      {tab === 'medicine' && (
        <>
          <div style={sectionHead}>
            <div style={sectionTitle}>Take today</div>
            <div style={statLabel}>{doneCount} of {doses.length} done</div>
          </div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', width: '342px' }}>
            {doses.map((d) => (
              <div key={d.id} onClick={() => toggleDose(d.id)} style={{ ...rowCard, cursor: 'pointer', width: '100%' }}>
                {/* tick circle */}
                <div style={{ alignItems: 'center', borderColor: d.taken ? 'var(--color-primary)' : 'var(--color-border)', backgroundColor: d.taken ? 'var(--color-primary)' : 'transparent', borderRadius: '999px', borderStyle: 'solid', borderWidth: '2px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '22px', justifyContent: 'center', width: '22px', transition: 'background-color 0.2s ease, border-color 0.2s ease' }}>
                  {d.taken && (
                    <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13l4 4L19 7" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '15px', lineHeight: '20px' }}>
                  {d.name} · {d.when}
                </div>
                <StatusPill accent={!d.taken && d.schedule.startsWith('Due')}>
                  {d.taken ? 'Taken' : d.schedule}
                </StatusPill>
              </div>
            ))}
          </div>

          <div style={sectionHead}>
            <div style={sectionTitle}>Currently taking</div>
            <div style={statLabel}>{medications.length}</div>
          </div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', width: '342px' }}>
            {medications.map((m) => (
              <div key={m.id} style={{ ...rowCard, width: '100%' }}>
                <AccentIconBox>{PillIcon}</AccentIconBox>
                <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>
                    {m.name}
                  </div>
                  <div style={statLabel}>{m.detail}</div>
                </div>
                <StatusPill>{m.status}</StatusPill>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ------------------------------------------------ Docs */}
      {tab === 'docs' && (
        <>
          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '16px', width: '342px' }}>
            {DOC_FILTERS.map((f) => {
              const active = f.value === docFilter;
              return (
                <div
                  key={f.value}
                  onClick={() => setDocFilter(f.value)}
                  style={{
                    alignItems: 'center', backgroundColor: active ? 'var(--color-primary)' : 'var(--color-card)',
                    borderColor: active ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '999px',
                    borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex',
                    flexShrink: '0', justifyContent: 'center', paddingBlock: '9px', paddingInline: '16px', userSelect: 'none',
                    transition: 'background-color 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  <div style={{ boxSizing: 'border-box', color: active ? '#FFFFFF' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
                    {f.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px', paddingBlock: '16px', paddingInline: '24px' }}>
            Reports and results, newest first
          </div>

          <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', width: '342px' }}>
            {visibleDocs.map((d) => {
              // Test results keep the warning tint so the two kinds stay
              // distinguishable at a glance; reports use the primary blue.
              const isTest = d.kind === 'test';
              const tint = isTest ? 'var(--color-warning-tint)' : 'var(--color-primary-tint)';
              const stroke = isTest ? 'var(--color-warning)' : 'var(--color-primary)';
              return (
                <div key={d.id} style={{ ...rowCard, alignItems: 'center', width: '100%' }}>
                  <div style={{ alignItems: 'center', backgroundColor: tint, borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                      <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '3px' }}>
                    <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>
                      {d.title}
                    </div>
                    <div style={statLabel}>{d.meta}</div>
                  </div>
                  <div style={{ alignItems: 'center', borderColor: 'var(--color-border)', borderRadius: '8px', borderStyle: 'dashed', borderWidth: '1px', boxSizing: 'border-box', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '13px', paddingBlock: '5px', paddingInline: '10px', userSelect: 'none' }}>
                    View
                  </div>
                </div>
              );
            })}
            {!visibleDocs.length && (
              <div style={{ ...statLabel, paddingBlock: '32px', textAlign: 'center' }}>Nothing in this category.</div>
            )}
          </div>
        </>
      )}

      {/* ------------------------------------------------ Summary */}
      {tab === 'summary' && (
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
            <div onClick={() => setTab('medicine')} style={{ ...statCard, cursor: 'pointer' }}>
              <div style={statLabel}>Medicines</div>
              <div style={statValue}>{medications.length} ongoing</div>
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
              <div key={id} style={{ ...rowCard, marginTop: i ? '8px' : 0 }}>
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
