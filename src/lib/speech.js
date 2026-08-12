/**
 * TalkBack speech output.
 *
 * Uses the browser's built-in Web Speech API (window.speechSynthesis), which is
 * free and offline — no third-party service, no API key, no added dependency.
 */

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

export const speechSupported = Boolean(synth);

let lastPhrase = '';
let lastAt = 0;

/**
 * Speak a phrase. By default it interrupts whatever is currently being read,
 * which is how screen readers behave when focus moves.
 *
 * Repeating the same phrase within a second is ignored, so a re-render (or
 * React's development double-effect) cannot restart an announcement mid-way.
 */
export function speak(text, { interrupt = true, rate = 1 } = {}) {
  if (!synth || !text) return;
  const phrase = String(text).replace(/\s+/g, ' ').trim();
  if (!phrase) return;

  const now = Date.now();
  if (phrase === lastPhrase && now - lastAt < 1000) return;
  lastPhrase = phrase;
  lastAt = now;

  if (interrupt) synth.cancel();

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  synth.speak(utterance);
}

export function stopSpeaking() {
  lastPhrase = '';
  if (synth) synth.cancel();
}
