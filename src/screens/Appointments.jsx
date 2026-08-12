import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicBar from '../components/VoiceBar';
import { useApp } from '../state/AppContext';
import { doctors } from '../data/doctors';
import SpeakerButton from '../components/SpeakerButton';

// Ported from "02 Appointments (In Person).js" and "02 Appointments (Video).js"
// These are a carousel (chevrons + dot indicators), not a tab strip.

const chevronBox = {
  alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex',
  flexShrink: '0', height: '32px', justifyContent: 'center', width: '32px',
};
const metaText = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };

export default function Appointments() {
  const navigate = useNavigate();
  const { appointment } = useApp();
  const [index, setIndex] = useState(0);

  const booked = doctors.find((d) => d.id === appointment.doctorId) || doctors[0];

  // The carousel holds the user's booked appointment plus the demo entries the
  // source screens show (three dots = three slides).
  const slides = [
    { date: appointment.date, time: appointment.time, doctor: booked, mode: appointment.mode, location: appointment.location },
    { date: 'Mon 13 Jul', time: '12:30', doctor: doctors[0], mode: 'video', location: 'City General Hospital · Level 2' },
    { date: 'Thu 17 Jul', time: '09:30', doctor: doctors[2], mode: 'in-person', location: 'Specialist Heart Centre · Level 4' },
  ];

  function prev() { setIndex((i) => (i - 1 + slides.length) % slides.length); }
  function next() { setIndex((i) => (i + 1) % slides.length); }

  return (
    <>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: 'var(--spacing-sm)', paddingBottom: '16px', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <div onClick={() => navigate('/home')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-card)', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
          <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
            <path d="M8 13.333s-4.667-3-6.333-6A3.067 3.067 0 0 1 8 4a3.067 3.067 0 0 1 6.333 3.333C12.667 10.333 8 13.333 8 13.333z" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '36px', flex: 1 }}>
          Appointments
        </div>
        <SpeakerButton />
      </div>

      <MicBar />

      {/* Carousel — track slides horizontally between the two chevrons */}
      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', paddingTop: 'var(--spacing-sm)', width: '342px' }}>
        <div onClick={prev} style={chevronBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m15 5-7 7 7 7" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Viewport: 342 − two 32px chevrons − two 8px gaps */}
        <div style={{ boxSizing: 'border-box', flexBasis: '0%', flexGrow: '1', overflow: 'hidden' }}>
          <div
            style={{
              boxSizing: 'border-box', display: 'flex',
              transform: `translateX(-${index * 100}%)`,
              transition: 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          >
            {slides.map((s, i) => (
              <div key={i} style={{ boxSizing: 'border-box', flexShrink: 0, width: '100%' }}>
                <div style={{ backgroundColor: 'var(--color-card)', borderColor: i === index ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', transition: 'border-color 0.35s ease' }}>
                  <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, lineHeight: '28px' }}>
                    {s.date} · {s.time}
                  </div>
                  <div style={metaText}>{s.doctor.name} · {s.doctor.specialty}</div>
                  <div style={metaText}>{s.location}</div>
                  <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px', paddingTop: '4px' }}>
                    {s.mode === 'video' ? (
                      <div onClick={() => navigate('/call')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', gap: '6px', height: '42px', justifyContent: 'center' }}>
                        <div style={{ boxSizing: 'border-box', color: 'var(--color-background)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
                          Joing Call
                        </div>
                      </div>
                    ) : (
                      <>
                        <div onClick={() => navigate('/choose-datetime')} style={{ alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', height: '42px', justifyContent: 'center' }}>
                          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
                            Reschedule
                          </div>
                        </div>
                        <div onClick={() => navigate('/map')} style={{ alignItems: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', gap: '6px', height: '42px', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
                            <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" fill="none" stroke="var(--color-background)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="2.5" fill="none" stroke="var(--color-background)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div style={{ boxSizing: 'border-box', color: 'var(--color-background)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
                            Directions
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div onClick={next} style={chevronBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m9 5 7 7-7 7" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Dots */}
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px', justifyContent: 'center', paddingTop: '12px' }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{ backgroundColor: i === index ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', flexShrink: '0', height: '7px', width: '7px' }}
          />
        ))}
      </div>

      <div
        onClick={() => navigate('/find-doctor')}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '24px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Book an appointment
        </div>
      </div>

      <div
        onClick={() => navigate('/records')}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', gap: '12px', marginTop: '12px', paddingBlock: '14px', paddingInline: '16px', width: '342px' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
            Past appointment records
          </div>
          <div style={metaText}>Opens medical records</div>
        </div>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-secondary)', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
          →
        </div>
      </div>
    </>
  );
}
