import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import MicBar from '../components/VoiceBar';
import { useApp } from '../state/AppContext';
import { doctors, facilities } from '../data/doctors';

// Ported from the six "02b Find a doctor (...)" exports, consolidated into one
// state-driven screen (search mode, preferred date shown/hidden, doctor list
// expanded/collapsed).

const DATES = [
  { day: 'Mon', date: '14' },
  { day: 'Tue', date: '15' },
  { day: 'Wed', date: '16' },
  { day: 'Thu', date: '17' },
  { day: 'Fri', date: '18' },
];

const smallChevron = {
  alignItems: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px',
  borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex',
  flexShrink: '0', height: '20px', justifyContent: 'center', width: '20px',
};
const meta = { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' };

// Facility icons — hospital (house + cross) and clinic (care heart).
const FACILITY_ICON = {
  hospital: (
    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
      <path d="M4 21V8l8-5 8 5v13" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10v6M9 13h6" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clinic: (
    <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
      <path d="M12 20s-7-4.5-9.5-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.5 5C19 15.5 12 20 12 20z" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function IconBox({ children }) {
  return (
    <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '20px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', height: '40px', justifyContent: 'center', width: '40px' }}>
      {children}
    </div>
  );
}

function DistanceChip({ children }) {
  return (
    <div style={{ alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '4px', paddingBlock: '6px', paddingInline: '8px' }}>
      <svg width="13" height="13" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
        {children}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center', backgroundColor: active ? 'var(--color-primary-tint)' : 'var(--color-card)',
        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
        borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexShrink: '0',
        justifyContent: 'center', paddingBlock: '8px', paddingInline: '14px', userSelect: 'none',
      }}
    >
      <div style={{ boxSizing: 'border-box', color: active ? 'var(--color-primary)' : 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: active ? 500 : 400, lineHeight: '18px' }}>
        {label}
      </div>
    </div>
  );
}

/**
 * `ghost` = outlined secondary pill. `active` switches a ghost pill to the
 * tinted state used while a facility's doctor list is expanded.
 */
function ActionPill({ children, ghost, active, onClick, full }) {
  const bg = active ? 'var(--color-primary-tint)' : ghost ? 'var(--color-card)' : 'var(--color-primary)';
  const border = active ? 'var(--color-primary)' : 'var(--color-border)';
  const fg = active ? 'var(--color-primary)' : ghost ? 'var(--color-text-primary)' : 'var(--color-background)';
  return (
    <div
      onClick={onClick}
      style={{
        alignItems: 'center', backgroundColor: bg,
        borderColor: border, borderStyle: ghost ? 'solid' : 'none', borderWidth: ghost ? '1px' : 0,
        borderRadius: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', justifyContent: 'center',
        paddingBlock: full ? '12px' : '8px', paddingInline: '14px', width: full ? '100%' : 'fit-content', userSelect: 'none',
        transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.13s cubic-bezier(0.3, 0.8, 0.4, 1)',
      }}
    >
      <div style={{ boxSizing: 'border-box', color: fg, fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: active ? 600 : 500, lineHeight: '18px', transition: 'color 0.25s ease' }}>
        {children}
      </div>
    </div>
  );
}

function DoctorCard({ doctor, onBook, onProfile }) {
  return (
    <div style={{ alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: '16px', padding: '16px', width: '100%' }}>
      <div style={{ alignItems: 'flex-start', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
        <IconBox>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <circle cx="12" cy="8" r="4" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconBox>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
          <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>
            {doctor.name}
          </div>
          <div style={meta}>{doctor.specialty}</div>
          <div style={meta}>{doctor.facility}</div>
        </div>
        <DistanceChip>{doctor.distance}</DistanceChip>
      </div>
      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <ActionPill onClick={() => onBook(doctor, 'in-person')}>Book in-person</ActionPill>
        {doctor.video && <ActionPill onClick={() => onBook(doctor, 'video')}>Book video call</ActionPill>}
        <ActionPill ghost onClick={() => onProfile(doctor)}>Profile</ActionPill>
      </div>
    </div>
  );
}

export default function FindDoctor() {
  const navigate = useNavigate();
  const { setBooking } = useApp();
  const [mode, setMode] = useState('specialist');
  // Preferred date starts unclicked — picking one is optional.
  const [showDates, setShowDates] = useState(false);
  const [dateIndex, setDateIndex] = useState(null);
  const [filters, setFilters] = useState({ nearMe: true, video: false, today: false, signs: false });
  const [expanded, setExpanded] = useState(null);

  const selectedDate = dateIndex === null ? null : DATES[dateIndex];

  function togglePreferredDate() {
    setShowDates((open) => {
      // Collapsing the picker clears any choice, so nothing is carried over.
      if (open) setDateIndex(null);
      return !open;
    });
  }

  function handleBook(doctor, bookMode) {
    setBooking({
      doctorId: doctor.id,
      mode: bookMode,
      // Only carried over when the user actually picked a preferred date.
      date: selectedDate ? `${selectedDate.day} ${selectedDate.date} Jul` : null,
      dateKey: selectedDate ? selectedDate.date : null,
      location: doctor.facility,
      distance: doctor.distance,
    });
    navigate('/choose-datetime');
  }

  const visibleDoctors = doctors.filter((d) => (filters.video ? d.video : true));
  const visibleFacilities = facilities.filter((f) => f.type === mode);

  const MODES = [
    { value: 'specialist', label: 'Specialist' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic', label: 'Clinic' },
  ];

  return (
    <>
      <ScreenHeader
        stepLabel="Step 1 of 3"
        onBack={() => navigate('/home')}
        title="Find a doctor"
        progress="113px"
      />

      <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingInline: '24px', paddingTop: 'var(--spacing-sm)' }}>
        <MicBar />

        <div style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'var(--color-border)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', padding: '6px', width: '342px' }}>
          {MODES.map((m) => {
            const active = m.value === mode;
            return (
              <div
                key={m.value}
                onClick={() => { setMode(m.value); setExpanded(null); }}
                style={active
                  ? { alignItems: 'center', backgroundColor: 'var(--color-primary-tint)', borderColor: 'var(--color-primary)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '8px' }
                  : { alignItems: 'center', borderRadius: 'var(--radius-card)', boxShadow: '#00000033 0px 2px 3px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexBasis: '0%', flexGrow: '1', justifyContent: 'center', paddingBlock: '10px', paddingInline: '8px' }}
              >
                <div style={active
                  ? { boxSizing: 'border-box', color: 'var(--color-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }
                  : { boxSizing: 'border-box', color: 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', lineHeight: '18px' }}
                >
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferred date — optional. Unclicked by default. */}
      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', flexShrink: '0', gap: 'var(--spacing-sm)', paddingBottom: 'var(--spacing-sm)', paddingTop: '16px', width: '342px' }}>
        <div
          onClick={togglePreferredDate}
          style={{
            alignItems: 'center', backgroundColor: showDates ? 'var(--color-primary-tint)' : 'var(--color-card)',
            borderColor: showDates ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid',
            borderWidth: '1px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', gap: '6px',
            justifyContent: 'center', paddingBlock: '8px', paddingInline: '14px', width: 'fit-content', userSelect: 'none',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
            <path d="M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" fill="none" stroke={showDates ? 'var(--color-primary)' : 'var(--color-text-secondary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ boxSizing: 'border-box', color: showDates ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '18px' }}>
            Preferred date{selectedDate ? ` · ${selectedDate.day} ${selectedDate.date}` : ''}
          </div>
        </div>
        {!showDates && (
          <div style={{ ...meta, fontSize: '13px' }}>Optional — skip it and pick a date on the next step.</div>
        )}
      </div>

      {showDates && (
        <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', justifyContent: 'center', width: '342px' }}>
          <div onClick={() => setDateIndex((i) => (i === null ? 0 : Math.max(0, i - 1)))} style={smallChevron}>
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="m15 5-7 7 7 7" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {DATES.map((d, i) => {
            const active = i === dateIndex;
            return (
              <div
                key={d.date}
                onClick={() => setDateIndex(i)}
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
          <div onClick={() => setDateIndex((i) => (i === null ? 0 : Math.min(DATES.length - 1, i + 1)))} style={smallChevron}>
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
              <path d="m9 5 7 7-7 7" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      <div style={{ alignItems: 'center', alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexShrink: '0', gap: '8px', paddingTop: '16px', width: '342px' }}>
        <FilterChip label="Near me" active={filters.nearMe} onClick={() => setFilters((f) => ({ ...f, nearMe: !f.nearMe }))} />
        <FilterChip label="Video" active={filters.video} onClick={() => setFilters((f) => ({ ...f, video: !f.video }))} />
        <FilterChip label="Today" active={filters.today} onClick={() => setFilters((f) => ({ ...f, today: !f.today }))} />
        <FilterChip label="Signs" active={filters.signs} onClick={() => setFilters((f) => ({ ...f, signs: !f.signs }))} />
      </div>

      <div style={{ alignItems: 'center', boxSizing: 'border-box', display: 'flex', paddingBlock: 'var(--spacing-sm)', paddingInline: '24px' }}>
        <div style={meta}>Sorted by distance</div>
      </div>

      <div style={{ alignSelf: 'center', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', width: '342px' }}>
        {mode === 'specialist' ? (
          visibleDoctors.length
            ? visibleDoctors.map((d) => <DoctorCard key={d.id} doctor={d} onBook={handleBook} onProfile={(doc) => navigate(`/doctor/${doc.id}`)} />)
            : <div style={{ ...meta, textAlign: 'center', paddingBlock: '16px' }}>No doctors match your filters.</div>
        ) : (
          visibleFacilities.map((f) => {
            const isOpen = expanded === f.id;
            const facDoctors = doctors.filter((d) => f.doctorIds.includes(d.id) && (filters.video ? d.video : true));
            return (
              <div key={f.id} style={{ alignSelf: 'center', backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '12px', borderStyle: 'solid', borderWidth: '1px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', width: '342px' }}>
                <div style={{ alignItems: 'flex-start', boxSizing: 'border-box', display: 'flex', gap: '10px' }}>
                  <IconBox>{FACILITY_ICON[f.type]}</IconBox>
                  <div style={{ boxSizing: 'border-box', display: 'flex', flexBasis: '0%', flexDirection: 'column', flexGrow: '1', gap: '4px' }}>
                    <div style={{ boxSizing: 'border-box', color: 'var(--color-text-primary)', fontFamily: '"Inter", system-ui, sans-serif', fontSize: '20px', fontWeight: 600, lineHeight: '24px' }}>
                      {f.name}
                    </div>
                    <div style={meta}>{f.count} Doctor{f.count > 1 ? 's' : ''} Avaiable</div>
                  </div>
                  <DistanceChip>{f.distance}</DistanceChip>
                </div>
                <ActionPill ghost full active={isOpen} onClick={() => setExpanded(isOpen ? null : f.id)}>
                  {isOpen ? 'Hide Doctors' : 'Show Doctors'}
                </ActionPill>
                {isOpen && facDoctors.map((d) => <DoctorCard key={d.id} doctor={d} onBook={handleBook} onProfile={(doc) => navigate(`/doctor/${doc.id}`)} />)}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
