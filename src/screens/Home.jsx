import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import { PillButton } from '../components/Buttons';
import { useApp } from '../state/AppContext';
import { doctors } from '../data/doctors';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "01 Homepage (In Person Booking).js" and
// "01 Homepage (Video Appointment open/Closed).js"

const card = {
  alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box',
  display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '12px', padding: '16px', width: '342px',
};
const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' };
const cardValue = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' };
const cardMeta = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };
const arrow = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' };

function ServiceTile({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '8px', paddingBlock: '16px', paddingInline: '12px' }}
    >
      {icon}
      <div style={{ alignContent: 'center', boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, appointment, logout } = useApp();
  const doctor = doctors.find((d) => d.id === appointment.doctorId) || doctors[0];
  const isVideo = appointment.mode === 'video';

  return (
    <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Greeting */}
      <div style={{ alignItems: 'center', alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingInline: '24px', paddingTop: '8px' }}>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
          <div style={sectionTitle}>Good morning, {currentUser?.name || 'Aisha'}</div>
        </div>
        <SpeakerButton />
      </div>

      <div style={{ alignItems: 'center', alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)', paddingRight: '24px', paddingTop: '8px' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', lineHeight: '20px' }}>
            How can we help today?
          </div>
        </div>
      </div>

      <MicBar />

      <div
        onClick={() => navigate('/find-doctor')}
        style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Book an appointment
        </div>
      </div>

      <div
        onClick={() => navigate('/sos')}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-error)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', gap: 'var(--spacing-sm)', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M12 3 3 7v5c0 5 4 8 9 9 5-1 9-4 9-9V7z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8v4M12 16h.01" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Emergency SOS
        </div>
      </div>

      <div style={{ alignItems: 'baseline', alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' }}>
        <div style={sectionTitle}>Your snapshot</div>
      </div>

      {/* Upcoming appointment — whole card is the target, not just the arrow */}
      <div onClick={() => navigate('/appointments')} style={{ ...card, cursor: 'pointer' }}>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            Upcoming appointment
          </div>
          <div style={arrow}>→</div>
        </div>
        <div style={cardValue}>{appointment.date} · {appointment.time}</div>
        <div style={cardMeta}>{doctor.name} · {appointment.mode}</div>
        {/* stopPropagation so these act on their own, not the card behind them */}
        <div style={{ alignItems: 'center', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', gap: '6px', justifyContent: 'center', paddingBlock: '8px', width: 'fit-content' }}>
          {isVideo ? (
            <PillButton onClick={(e) => { e.stopPropagation(); navigate('/call'); }}>Join Call</PillButton>
          ) : (
            <>
              <PillButton
                onClick={(e) => { e.stopPropagation(); navigate('/map'); }}
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" fill="none" stroke="var(--color-background)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" fill="none" stroke="var(--color-background)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              >
                Directions
              </PillButton>
              <PillButton
                onClick={(e) => { e.stopPropagation(); navigate('/ar-map'); }}
                icon={
                  <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                    <path d="M7.5 1.875L2.5 4.375v6.25l5 2.5 5-2.5V4.375z" fill="none" stroke="var(--color-background)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 4.375l5 2.5 5-2.5M7.5 6.875v6.25" fill="none" stroke="var(--color-background)" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              >
                AR Map
              </PillButton>
            </>
          )}
        </div>
      </div>

      {/* Next medication — opens Records on the Medicine tab */}
      <div
        onClick={() => navigate('/records', { state: { tab: 'medicine' } })}
        style={{ ...card, cursor: 'pointer', marginTop: '12px' }}
      >
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" fill="none" stroke="var(--color-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 8.5 15.5 15.5" fill="none" stroke="var(--color-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-secondary)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            Next medication
          </div>
          <div style={arrow}>→</div>
        </div>
        <div style={cardValue}>Metformin · in 58 min</div>
        <div style={{ alignItems: 'center', backgroundColor: 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '8px', width: '100%' }}>
          <div style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '12px', boxSizing: 'border-box', flexShrink: '0', height: '8px', width: '108px' }} />
        </div>
        <div style={cardMeta}>2 of 3 doses taken today</div>
      </div>

      {/* Remote monitoring */}
      <div
        onClick={() => navigate('/records')}
        style={{ ...card, backgroundColor: 'var(--color-error-tint)', borderColor: 'var(--color-error)', cursor: 'pointer', marginTop: '12px' }}
      >
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M12 20s-7-4.5-9.5-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.5 5C19 15.5 12 20 12 20z" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-error)', flexBasis: '0%', flexGrow: '1', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            Remote monitoring
          </div>
          <div style={arrow}>→</div>
        </div>
        <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '16px' }}>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '2px', width: '76px' }}>
            <div style={cardValue}>72</div>
            <div style={cardMeta}>bpm</div>
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '2px', width: '100px' }}>
            <div style={cardValue}>118/76</div>
            <div style={cardMeta}>BP</div>
          </div>
          <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
            <div style={{ ...cardValue, color: 'var(--color-error)' }}>High</div>
            <div style={cardMeta}>glucose</div>
          </div>
        </div>
      </div>

      <div style={{ alignItems: 'baseline', alignSelf: 'stretch', boxSizing: 'border-box', display: 'flex', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' }}>
        <div style={sectionTitle}>All services</div>
      </div>

      <div style={{ boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', height: '86px', width: '342px' }}>
        <ServiceTile
          label="Teleconsult"
          onClick={() => navigate('/teleconsult')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m16 10 5-3v10l-5-3z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <ServiceTile
          label="Records"
          onClick={() => navigate('/records')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>

      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', height: '86px', marginTop: '12px', width: '342px' }}>
        <ServiceTile
          label="Booking"
          onClick={() => navigate('/appointments')}
          icon={
            <svg height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 425.6 15.36 15.36" xmlSpace="preserve" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
              <path d="M14.027 430.72H10.242V426.934c0-0.749-0.566-1.334-1.293-1.334h-2.538C5.688 425.6 5.122 426.186 5.122 426.934v3.786H1.336c-0.749 0-1.334 0.566-1.334 1.293v2.537c0 0.723 0.586 1.29 1.334 1.29H5.122V439.626c0 0.749 0.566 1.334 1.289 1.334h2.538c0.723 0 1.29-0.586 1.289-1.334V435.84h3.786c0.749 0 1.334-0.566 1.334-1.29V432.013C15.362 431.286 14.776 430.72 14.027 430.72zM14.722 434.55c0 0.371-0.298 0.65-0.695 0.65H9.922c-0.176 0-0.32 0.144-0.32 0.32V439.626c0 0.397-0.282 0.694-0.653 0.694h-2.538c-0.371 0-0.653-0.301-0.653-0.694V435.52c0-0.176-0.144-0.32-0.32-0.32H1.336c-0.397 0-0.694-0.278-0.694-0.65V432.013c0-0.371 0.298-0.653 0.694-0.653h4.106c0.176 0 0.32-0.144 0.32-0.32V426.934c0-0.397 0.282-0.694 0.652-0.694H8.952c0.371 0 0.65 0.298 0.65 0.694v4.106c0 0.176 0.144 0.32 0.32 0.32h4.105c0.397 0 0.694 0.282 0.695 0.653V434.55z" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.5" />
            </svg>
          }
        />
        <ServiceTile
          label="Nearest Care"
          onClick={() => navigate('/map')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.5 8.5 15.5 15.5" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>

      <div
        onClick={() => { logout(); navigate('/'); }}
        style={{
          alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-error-tint)', borderColor: 'var(--color-error)',
          borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer',
          display: 'flex', flexShrink: '0', gap: 'var(--spacing-sm)', height: '50px', justifyContent: 'center',
          marginTop: '24px', userSelect: 'none', width: '342px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M15 17l5-5-5-5M20 12H9M12 20H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" fill="none" stroke="var(--color-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-error)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          LOG OUT
        </div>
      </div>
    </div>
  );
}
