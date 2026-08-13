// Medicine + past-visit data behind the Records screens.

/** Today's scheduled doses. `schedule` is what shows when a dose isn't ticked. */
export const initialDoses = [
  { id: 'd1', name: 'Metformin 500 mg', when: 'Morning 08:00', schedule: 'Taken', taken: true },
  { id: 'd2', name: 'Amlodipine 5 mg', when: 'Afternoon 14:00', schedule: 'Due in 1h', taken: true },
  { id: 'd3', name: 'Metformin 500 mg', when: 'Night 21:00', schedule: 'Upcoming', taken: false },
];

export const medications = [
  { id: 'metformin', name: 'Metformin 500 mg', detail: 'Twice daily · for blood sugar', status: 'Ongoing' },
  { id: 'amlodipine', name: 'Amlodipine 5 mg', detail: 'Once daily · for blood pressure', status: 'Ongoing' },
  { id: 'vitamind', name: 'Vitamin D 1000 IU', detail: 'Once daily · supplement', status: 'Ongoing' },
];

/** Files in Records → Docs. `kind` drives the filter chips and the icon tint. */
export const documents = [
  { id: 'doc1', title: 'Visit report — Dr Lim', kind: 'appointment', meta: 'Appointment report · 2 Jun 2026' },
  { id: 'doc2', title: 'Blood test (FBC)', kind: 'test', meta: 'Test result · Lab · 2 Jun 2026' },
  { id: 'doc3', title: 'ECG result', kind: 'test', meta: 'Test result · Dr Tan · 18 Apr 2026' },
  { id: 'doc4', title: 'Referral letter — Cardiology', kind: 'appointment', meta: 'Appointment report · 18 Apr 2026' },
  { id: 'doc5', title: 'Chest X-ray', kind: 'test', meta: 'Test result · Radiology · 3 Feb 2026' },
];

export const DOC_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'appointment', label: 'Appointment reports' },
  { value: 'test', label: 'Test results' },
];

/** Past appointments; each carries the full report shown when opened. */
export const visits = [
  {
    id: 'v1',
    date: '2 Jun 2026',
    time: '10:00',
    doctor: 'Dr Lim',
    specialty: 'General medicine',
    mode: 'In-person',
    summary: 'Acute bronchitis',
    facility: 'City General Hospital',
    status: 'Completed',
    reason: 'Persistent cough for 10 days',
    diagnosis: 'Diagnosis: Acute bronchitis',
    report:
      'Chest clear on examination, no signs of pneumonia. Likely viral, settling. ' +
      'Advised rest, fluids and a short course of antibiotics as a precaution.',
    vitals: [
      { label: 'BP', value: '118 / 76' },
      { label: 'HR', value: '72 bpm' },
      { label: 'Temp', value: '37.1 °C' },
      { label: 'Wt', value: '68 kg' },
    ],
    prescription: ['Amoxicillin 500 mg — 3×/day, 5 days', 'Paracetamol 500 mg — as needed'],
    followUp: 'Follow-up: Return in 2 weeks if cough persists',
    documents: ['Visit report (PDF)'],
  },
  {
    id: 'v2',
    date: '18 Apr 2026',
    time: '15:30',
    doctor: 'Dr Tan',
    specialty: 'Cardiology',
    mode: 'Video',
    summary: 'Benign palpitations, normal ECG',
    facility: 'Specialist Heart Centre',
    status: 'Completed',
    reason: 'Occasional fluttering in the chest after coffee',
    diagnosis: 'Diagnosis: Benign palpitations',
    report:
      'ECG reviewed during the call and is normal. Symptoms consistent with caffeine sensitivity. ' +
      'No further cardiac investigation needed at this stage.',
    vitals: [
      { label: 'BP', value: '124 / 80' },
      { label: 'HR', value: '78 bpm' },
      { label: 'Temp', value: '36.8 °C' },
      { label: 'Wt', value: '68 kg' },
    ],
    prescription: ['No medication prescribed'],
    followUp: 'Follow-up: Only if palpitations become frequent or with chest pain',
    documents: ['ECG result (PDF)', 'Visit report (PDF)'],
  },
  {
    id: 'v3',
    date: '3 Feb 2026',
    time: '09:15',
    doctor: 'Dr Aziz',
    specialty: 'Dermatology',
    mode: 'In-person',
    summary: 'Contact dermatitis',
    facility: 'Bukit Jalil Clinic',
    status: 'Completed',
    reason: 'Itchy rash on both hands for 2 weeks',
    diagnosis: 'Diagnosis: Contact dermatitis',
    report:
      'Rash limited to the hands, consistent with irritation from a new cleaning product. ' +
      'Advised to switch product and use gloves.',
    vitals: [
      { label: 'BP', value: '116 / 74' },
      { label: 'HR', value: '70 bpm' },
      { label: 'Temp', value: '36.6 °C' },
      { label: 'Wt', value: '67 kg' },
    ],
    prescription: ['Hydrocortisone 1% cream — twice daily, 7 days'],
    followUp: 'Follow-up: Return if the rash spreads or does not settle in 2 weeks',
    documents: ['Visit report (PDF)'],
  },
];
