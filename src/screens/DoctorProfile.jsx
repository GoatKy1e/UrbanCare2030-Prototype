import { useNavigate, useParams } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import { useApp } from '../state/AppContext';
import { doctors } from '../data/doctors';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "03 Doctor profile.js"

const meta = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };
const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' };
const card = {
  alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
  flexShrink: '0', gap: '8px', paddingBlock: '14px', paddingInline: '16px', width: '342px',
};

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBooking } = useApp();
  const doctor = doctors.find((d) => d.id === id) || doctors[0];

  function book(mode) {
    setBooking({ doctorId: doctor.id, mode, date: 'Mon 14 Jul', location: doctor.facility, distance: doctor.distance });
    navigate('/choose-datetime');
  }

  return (
    <>
      <div onClick={() => navigate('/find-doctor')} style={{ alignItems: 'center', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: 'var(--spacing-sm)', paddingInline: '24px' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m15 5-7 7 7 7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: 'var(--text-caption)', fontWeight: 500, lineHeight: '18px' }}>
          Back to search
        </div>
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, height: 'fit-content', letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          Doctor Details
        </div>
        <SpeakerButton />
      </div>

      <MicBar />

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '16px', paddingBottom: '24px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '36px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '72px', justifyContent: 'center', width: '72px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <circle cx="12" cy="8" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px' }}>
            {doctor.name}
          </div>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
            {doctor.specialty} · {doctor.years} yrs
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', paddingBlock: '14px', paddingInline: '16px', width: '342px' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            {doctor.facility}
          </div>
          <div style={meta}>{doctor.facilityType}</div>
        </div>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '4px', paddingBlock: '6px', paddingInline: '10px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.5" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            {doctor.distance}
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', gap: '12px', paddingTop: '12px', width: '342px' }}>
        <div onClick={() => book('in-person')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '46px', justifyContent: 'center' }}>
          <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            Book in-person
          </div>
        </div>
        {doctor.video && (
          <div onClick={() => book('video')} style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '46px', justifyContent: 'center' }}>
            <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
              Book video call
            </div>
          </div>
        )}
      </div>

      <div style={{ alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' }}>
        <div style={sectionTitle}>Languages &amp; access</div>
      </div>
      <div style={card}>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
          {doctor.languages}
        </div>
        {doctor.access.map((a) => <div key={a} style={meta}>{a}</div>)}
      </div>

      <div style={{ alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' }}>
        <div style={sectionTitle}>Qualifications</div>
      </div>
      <div style={card}>
        {doctor.qualifications.map((q) => (
          <div key={q} style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            {q}
          </div>
        ))}
        <div style={meta}>{doctor.focus}</div>
      </div>
    </>
  );
}
