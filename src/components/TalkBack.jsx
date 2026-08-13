import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { speak, stopSpeaking } from '../lib/speech';

/**
 * TalkBack: reads the interface aloud while voice guidance is on.
 *
 * Two behaviours, matching a phone screen reader:
 *  - announce each screen as you arrive on it
 *  - "explore by touch": pointing at or focusing a control reads its label
 *
 * Mounted once at the app root. It renders nothing.
 */

const ROUTE_LABEL = {
  // '/' is deliberately absent: the Welcome screen speaks its own script,
  // always, so announcing the route here would talk over it.
  '/register': 'Create your account. Step 1 of 2',
  '/register/password': 'Select your password. Step 2 of 2',
  '/register/result': 'Registration result',
  '/login': 'Log in to UrbanCare',
  '/home': 'Home',
  '/appointments': 'Your appointments',
  '/find-doctor': 'Find a doctor. Step 1 of 3',
  '/choose-datetime': 'Choose date and time. Step 2 of 3',
  '/appointment-details': 'Appointment details. Step 3 of 3',
  '/appointment-result': 'Appointment result',
  '/call': 'Video call',
  '/teleconsult': 'Teleconsultation',
  '/map': 'Nearest care',
  '/ar-map': 'A R map',
  '/records': 'Medical records',
  '/records/visit': 'Visit report',
  '/sos': 'Emergency S O S',
};

// Anything a user can act on.
const INTERACTIVE = '[aria-label], [role="button"], [role="switch"], button, a, input, [style*="cursor: pointer"]';

function describe(target) {
  const el = target.closest?.(INTERACTIVE);
  if (!el) return null;

  if (el.tagName === 'INPUT') {
    const kind = el.type === 'password' ? 'password field' : 'text field';
    return `${el.getAttribute('placeholder') || kind}, ${kind}`;
  }

  let label = el.getAttribute('aria-label') || el.textContent || '';
  label = label.replace(/\s+/g, ' ').trim();
  if (!label) return null;

  const role = el.getAttribute('role');
  if (role === 'switch') {
    label += el.getAttribute('aria-checked') === 'true' ? ', on' : ', off';
  } else if (role === 'button' || el.tagName === 'BUTTON') {
    label += ', button';
  }
  return label.slice(0, 140);
}

export default function TalkBack() {
  const { voiceGuidance } = useApp();
  const { pathname } = useLocation();
  const lastSpoken = useRef('');

  // Announce the screen on arrival.
  useEffect(() => {
    if (!voiceGuidance) return;
    const label = ROUTE_LABEL[pathname] || ROUTE_LABEL[`/${pathname.split('/')[1]}`];
    if (label) {
      lastSpoken.current = '';
      speak(label);
    }
  }, [pathname, voiceGuidance]);

  // Explore by touch: read whatever the user points at or focuses.
  useEffect(() => {
    if (!voiceGuidance) {
      stopSpeaking();
      return;
    }

    const announce = (event) => {
      const phrase = describe(event.target);
      if (!phrase || phrase === lastSpoken.current) return;
      lastSpoken.current = phrase;
      speak(phrase);
    };

    // pointerover doubles as "explore by touch" on desktop; focusin covers
    // keyboard and assistive-tech navigation.
    document.addEventListener('pointerover', announce, true);
    document.addEventListener('focusin', announce, true);
    return () => {
      document.removeEventListener('pointerover', announce, true);
      document.removeEventListener('focusin', announce, true);
    };
  }, [voiceGuidance]);

  // Never leave speech running after the app unmounts.
  useEffect(() => stopSpeaking, []);

  return null;
}
