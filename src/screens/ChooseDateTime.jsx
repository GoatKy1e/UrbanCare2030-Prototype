import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import { useApp } from '../state/AppContext';
import { doctors } from '../data/doctors';

// Ported from "02c Choose date and time.js"

const DATES = [
  { day: 'Mon', date: '14' },
  { day: 'Tue', date: '15' },
  { day: 'Wed', date: '16' },
  { day: 'Thu', date: '17' },
  { day: 'Fri', date: '18' },
];
const TIME_ROWS = [['09:00', '09:30', '10:00'], ['10:30', '11:00', '11:30']];
const ASSISTANCE = [
  { label: 'Interpreter', width: '95px' },
  { label: 'Wheel Chair', width: '111px' },
  { label: 'Home Pickup', width: '113px' },
];

const smallChevron = {
  alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex',
  flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px',
};
const sectionHead = { alignItems: 'baseline', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', paddingInline: '24px', paddingTop: '24px' };
const sectionTitle = { boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '28px' };
const meta = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };

export default function ChooseDateTime() {
  const navigate = useNavigate();
  const { booking, setBooking } = useApp();

  // A preferred date chosen on the previous step arrives via booking.dateKey.
  // If none was chosen, the user has to pick a date here before a time.
  const carried = booking?.dateKey ? DATES.findIndex((d) => d.date === booking.dateKey) : -1;
  const [dateIndex, setDateIndex] = useState(carried >= 0 ? carried : null);
  const [fromSearch] = useState(carried >= 0);
  const [time, setTime] = useState(null);
  const [assistance, setAssistance] = useState([]);
  const [error, setError] = useState(null);

  if (!booking) return <Navigate to="/find-doctor" replace />;
  const doctor = doctors.find((d) => d.id === booking.doctorId) || doctors[0];
  const selectedDate = dateIndex === null ? null : DATES[dateIndex];

  function pickDate(i) {
    setDateIndex(i);
    setTime(null); // slots belong to a specific day
    setError(null);
  }

  function toggleAssistance(a) {
    setAssistance((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function submit() {
    if (!selectedDate) { setError('Please select a date first'); return; }
    if (!time) { setError('Please select a time slot to continue'); return; }
    setBooking({ ...booking, date: `${selectedDate.day} ${selectedDate.date} Jul`, dateKey: selectedDate.date, time, assistance });
    navigate('/appointment-details');
  }

  return (
    <>
      <ScreenHeader
        stepLabel="Step 2 of 3"
        onBack={() => navigate('/find-doctor')}
        title="Date & time"
        progress="228px"
      />

      {/* Selected doctor summary */}
      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', gap: '12px', marginTop: '16px', padding: '16px', width: '342px' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>
            {doctor.name} · {doctor.distance}
          </div>
          <div style={meta}>{doctor.specialty} · {booking.mode}</div>
        </div>
        <div onClick={() => navigate('/find-doctor')} style={{ boxSizing: 'border-box', color: 'var(--color-primary)', cursor: 'pointer', flexShrink: '0', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
          Change
        </div>
      </div>

      {/* Date */}
      <div style={sectionHead}>
        <div style={sectionTitle}>Date</div>
        <div style={fromSearch
          ? { boxSizing: 'border-box', color: 'var(--color-success)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }
          : { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}
        >
          {fromSearch ? 'From your search' : 'Pick a date'}
        </div>
      </div>
      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', justifyContent: 'center', width: '342px' }}>
        <div onClick={() => pickDate(dateIndex === null ? 0 : Math.max(0, dateIndex - 1))} style={smallChevron}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m15 5-7 7 7 7" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {DATES.map((d, i) => {
          const active = i === dateIndex;
          return (
            <div
              key={d.date}
              onClick={() => pickDate(i)}
              style={{
                alignItems: 'center', alignSelf: 'stretch', backgroundColor: active ? 'var(--color-primary-tint)' : 'var(--color-card)',
                borderColor: active ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
                borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%',
                flexDirection: 'column', flexGrow: '1', gap: '2px', paddingBlock: '10px', userSelect: 'none',
              }}
            >
              <div style={{ boxSizing: 'border-box', color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
                {d.day}
              </div>
              <div style={{ boxSizing: 'border-box', color: active ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>
                {d.date}
              </div>
            </div>
          );
        })}
        <div onClick={() => pickDate(dateIndex === null ? 0 : Math.min(DATES.length - 1, dateIndex + 1))} style={smallChevron}>
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="m9 5 7 7-7 7" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Time — locked until a date exists */}
      <div style={sectionHead}>
        <div style={{ ...sectionTitle, opacity: selectedDate ? 1 : 0.45 }}>Time</div>
        <div style={meta}>{selectedDate ? `${selectedDate.day} ${selectedDate.date} Jul` : 'Select a date first'}</div>
      </div>
      {TIME_ROWS.map((row, ri) => (
        <div key={ri} style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '12px', marginTop: ri ? '12px' : 0, width: '342px' }}>
          {row.map((t) => {
            const active = t === time;
            const locked = !selectedDate;
            return (
              <div
                key={t}
                onClick={() => { if (locked) { setError('Please select a date first'); return; } setTime(t); setError(null); }}
                style={{
                  alignItems: 'center', backgroundColor: active ? 'var(--color-primary-tint)' : 'var(--color-card)',
                  borderColor: active ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
                  borderWidth: '1px', boxSizing: 'border-box', cursor: locked ? 'not-allowed' : 'pointer', display: 'flex',
                  flexBasis: '0%', flexGrow: '1', height: '50px', justifyContent: 'center', opacity: locked ? 0.45 : 1,
                  userSelect: 'none',
                  transition: 'opacity 0.2s ease, transform 0.13s cubic-bezier(0.3, 0.8, 0.4, 1), background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div style={{ boxSizing: 'border-box', color: active ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: active ? 500 : 400, lineHeight: '20px' }}>
                  {t}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {error && (
        <div style={{ alignSelf: 'center', boxSizing: 'border-box', color: 'var(--color-error)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 700, lineHeight: '18px', paddingTop: '12px', width: '342px' }}>
          {error}
        </div>
      )}

      {/* Assistance */}
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '6px', paddingInline: '24px', paddingTop: 'var(--spacing-md)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
          <path d="M6 9a6 6 0 1 1 12 0c0 3-3 4-3 7a3 3 0 0 1-6 0" fill="none" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}>
          Need Assistance?
        </div>
      </div>
      <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '6px', justifyContent: 'center', marginTop: '8px', paddingBlock: '14px', paddingInline: 'var(--spacing-xs)', width: '342px' }}>
        {ASSISTANCE.map((a) => {
          const active = assistance.includes(a.label);
          return (
            <div
              key={a.label}
              onClick={() => toggleAssistance(a.label)}
              style={{
                alignItems: 'center', backgroundColor: active ? 'var(--color-primary-tint)' : 'var(--color-card)',
                borderColor: active ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
                borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0',
                height: '32px', justifyContent: 'center', width: a.width, userSelect: 'none',
              }}
            >
              <div style={{ boxSizing: 'border-box', color: active ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>
                {a.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        onClick={submit}
        style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-primary)', borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0', height: '50px', justifyContent: 'center', marginTop: '16px', width: '342px' }}
      >
        <div style={{ boxSizing: 'border-box', color: '#FFFFFF', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 500, lineHeight: '24px' }}>
          Continue
        </div>
      </div>
    </>
  );
}
