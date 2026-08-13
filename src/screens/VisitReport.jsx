import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SpeakerButton from '../components/SpeakerButton';
import { visits } from '../data/records';
import { speak } from '../lib/speech';

// Full report for a past appointment, opened from Records → Bookings.

const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '18px', fontWeight: 600, lineHeight: '24px' };
const sectionHead = { alignItems: 'center', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', paddingInline: '24px', paddingTop: '20px' };
const body = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '20px' };
const panel = {
  alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
  gap: '8px', padding: '14px', width: '342px',
};

function OutlineButton({ children, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center', borderColor: 'var(--color-primary)', borderRadius: '999px', borderStyle: 'solid',
        borderWidth: '1px', boxSizing: 'border-box', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex',
        flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, gap: '6px',
        justifyContent: 'center', paddingBlock: '6px', paddingInline: '12px', userSelect: 'none',
      }}
    >
      {icon}
      {children}
    </div>
  );
}

export default function VisitReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const visit = visits.find((v) => v.id === id);

  if (!visit) return <Navigate to="/records" replace />;

  const readAloud = () => speak(`${visit.diagnosis}. ${visit.report}`, { rate: 0.95 });

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '12px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div
          onClick={() => navigate('/records', { state: { tab: 'bookings' } })}
          title="Back to bookings"
          style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m15 5-7 7 7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '26px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '32px', flex: 1 }}>
          Visit report
        </div>
        <SpeakerButton />
      </div>

      {/* Appointment summary */}
      <div style={{ ...panel, borderColor: 'var(--color-primary)', gap: '10px' }}>
        <div style={{ alignItems: 'flex-start', boxSizing: 'border-box', display: 'flex', gap: '12px' }}>
          <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '10px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="4" y="5" width="16" height="16" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" />
              <path d="M4 10h16M8 3v4M16 3v4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '3px' }}>
            <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '17px', fontWeight: 600, lineHeight: '22px' }}>
              {visit.date} · {visit.time}
            </div>
            <div style={body}>{visit.doctor} · {visit.specialty} · {visit.mode}</div>
            <div style={body}>{visit.facility}</div>
            <div style={{ alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'var(--color-primary-tint)', borderRadius: '8px', boxSizing: 'border-box', color: 'var(--color-primary)', display: 'flex', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '13px', fontWeight: 500, marginTop: '4px', paddingBlock: '4px', paddingInline: '10px' }}>
              {visit.status}
            </div>
          </div>
        </div>
      </div>

      <div style={sectionHead}><div style={sectionTitle}>Reason for visit</div></div>
      <div style={panel}><div style={body}>{visit.reason}</div></div>

      <div style={sectionHead}>
        <div style={sectionTitle}>Doctor's report</div>
        <OutlineButton
          onClick={readAloud}
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="M11 5 6 9H3v6h3l5 4zM16 9a4 4 0 0 1 0 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        >
          Read
        </OutlineButton>
      </div>
      <div style={panel}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '20px' }}>
          {visit.diagnosis}
        </div>
        <div style={body}>{visit.report}</div>
      </div>

      <div style={sectionHead}><div style={sectionTitle}>Vitals recorded</div></div>
      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr', width: '342px' }}>
        {visit.vitals.map((v) => (
          <div key={v.label} style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBlock: '12px', paddingInline: '14px' }}>
            <div style={body}>{v.label}</div>
            <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '15px', fontWeight: 600, lineHeight: '20px' }}>
              {v.value}
            </div>
          </div>
        ))}
      </div>

      <div style={sectionHead}>
        <div style={sectionTitle}>Prescription</div>
        <OutlineButton onClick={() => navigate('/records', { state: { tab: 'medicine' } })}>View in Medicine</OutlineButton>
      </div>
      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', width: '342px' }}>
        {visit.prescription.map((p) => (
          <div key={p} style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '10px', paddingBlock: '12px', paddingInline: '14px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 8.5 15.5 15.5" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ ...body, color: 'var(--color-text-primary)' }}>{p}</div>
          </div>
        ))}

        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', gap: '10px', marginTop: '4px', paddingBlock: '12px', paddingInline: '14px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <rect x="4" y="5" width="16" height="16" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" />
            <path d="M4 10h16M8 3v4M16 3v4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div style={{ ...body, color: 'var(--color-text-primary)' }}>{visit.followUp}</div>
        </div>
      </div>

      <div style={sectionHead}>
        <div style={sectionTitle}>Attached documents</div>
        <OutlineButton onClick={() => navigate('/records', { state: { tab: 'docs' } })}>All documents</OutlineButton>
      </div>
      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', width: '342px' }}>
        {visit.documents.map((d) => (
          <div key={d} style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '10px', paddingBlock: '12px', paddingInline: '14px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ ...body, color: 'var(--color-text-primary)', flexBasis: '0%', flexGrow: '1' }}>{d}</div>
            <div style={{ alignItems: 'center', borderColor: 'var(--color-border)', borderRadius: '8px', borderStyle: 'dashed', borderWidth: '1px', boxSizing: 'border-box', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '13px', paddingBlock: '4px', paddingInline: '10px' }}>
              View
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
