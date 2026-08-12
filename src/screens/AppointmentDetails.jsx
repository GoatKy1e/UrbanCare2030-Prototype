import { Navigate, useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import { GhostLink } from '../components/Buttons';
import { useApp } from '../state/AppContext';
import { doctors } from '../data/doctors';

// Ported from "02d Appointment Details.js" — label/value chip rows on a tinted track.

function DetailRow({ label, value, smallLabel, smallValue }) {
  return (
    <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '5px', height: '40px', justifyContent: 'center', paddingInline: 'var(--spacing-md)', width: '318px' }}>
      <div style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '30px', justifyContent: 'center', width: '107px' }}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', display: 'flex', flexShrink: '0', flexWrap: 'wrap', fontFamily: '"Inter", system-ui, sans-serif', fontSize: smallLabel ? 'var(--text-caption)' : '16px', fontWeight: 500, justifyContent: 'center', lineHeight: smallLabel ? '18px' : '20px', textAlign: 'center', width: '96px' }}>
          {label}
        </div>
      </div>
      <div style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '2px', height: '30px', justifyContent: 'center', paddingInline: 'var(--spacing-sm)', width: '174px' }}>
        <div style={{ alignContent: 'center', alignSelf: 'stretch', boxSizing: 'border-box', color: 'var(--color-text-primary)', display: 'flex', flexWrap: 'wrap', fontFamily: '"Inter", system-ui, sans-serif', fontSize: smallValue ? '12px' : '16px', fontWeight: 500, justifyContent: 'center', lineHeight: smallValue ? '16px' : '20px', textAlign: 'center' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default function AppointmentDetails() {
  const navigate = useNavigate();
  const { booking, confirmAppointment, currentUser } = useApp();

  if (!booking) return <Navigate to="/find-doctor" replace />;
  const doctor = doctors.find((d) => d.id === booking.doctorId) || doctors[0];

  function confirm() {
    confirmAppointment();
    navigate('/appointment-result', { state: { success: true } });
  }

  return (
    <>
      <ScreenHeader
        stepLabel="Step 3 of 3"
        onBack={() => navigate('/choose-datetime')}
        title="Appointment Detail"
        progress="342px"
      />

      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', padding: '12px', width: '342px' }}>
        <DetailRow label="Doctor:" value={doctor.name} />
        <DetailRow label="Type:" value={booking.mode === 'video' ? 'Video Call' : 'In Person Visit'} />
        <DetailRow label="Date:" value={booking.date} />
        <DetailRow label="Time:" value={booking.time} />
        <DetailRow label="Location:" value={`${booking.location} Level 2`} smallLabel smallValue />
        <DetailRow label="Distance:" value={`${booking.distance} From You`} smallLabel />
        <DetailRow label="Assistance:" value={booking.assistance?.length ? booking.assistance.join(', ') : 'None'} smallLabel smallValue />
        <DetailRow label="Patient:" value={`${currentUser?.name || 'Aisha'} Binti . IC **** 4821`} smallLabel smallValue />
      </div>

      <div
        onClick={confirm}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Confirm request
        </div>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
        <GhostLink onClick={() => navigate('/appointment-result', { state: { success: false } })}>
          Preview: simulate booking failure (demo)
        </GhostLink>
      </div>
    </>
  );
}
