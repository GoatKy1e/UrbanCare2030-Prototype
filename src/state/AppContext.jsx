import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const SEED_USER = {
  name: 'Aisha',
  phone: '0123456789',
  ic: '990101011234',
  email: 'demo@urbancare.my',
  password: 'Password1',
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState([SEED_USER]);
  const [currentUser, setCurrentUser] = useState(null);
  // Voice guidance is on by default; the header speaker button mutes it.
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  // Colour-vision-deficiency palette, toggled from the Welcome screen.
  const [colorBlindMode, setColorBlindMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (colorBlindMode) root.setAttribute('data-palette', 'cvd');
    else root.removeAttribute('data-palette');
  }, [colorBlindMode]);
  const [booking, setBooking] = useState(null);
  const [appointment, setAppointment] = useState({
    date: 'Mon 14 Jul',
    time: '10:00',
    doctorId: 'lim',
    mode: 'in-person',
    location: 'City General Hospital · Level 2',
  });

  function findByMethod(method, value) {
    return users.find((u) => u[method]?.toLowerCase() === String(value).toLowerCase());
  }

  function register(method, value, password) {
    const existing = findByMethod(method, value);
    if (existing) return { ok: false, reason: 'duplicate' };
    const newUser = { name: 'New Patient', phone: '', ic: '', email: '', [method]: value, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true };
  }

  function login(method, value, password) {
    const existing = findByMethod(method, value);
    if (!existing || existing.password !== password) return { ok: false };
    setCurrentUser(existing);
    return { ok: true };
  }

  function loginFaceId() {
    setCurrentUser(SEED_USER);
    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  function confirmAppointment() {
    if (booking) {
      setAppointment({
        date: booking.date,
        time: booking.time,
        doctorId: booking.doctorId,
        mode: booking.mode,
        location: booking.location,
        assistance: booking.assistance,
      });
    }
  }

  const value = useMemo(
    () => ({
      currentUser, register, login, loginFaceId, logout,
      booking, setBooking, appointment, confirmAppointment,
      voiceGuidance, setVoiceGuidance,
      colorBlindMode, setColorBlindMode,
      SEED_USER,
    }),
    [currentUser, booking, appointment, voiceGuidance, colorBlindMode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
