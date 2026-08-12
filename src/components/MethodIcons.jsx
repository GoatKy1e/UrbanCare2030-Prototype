// Method icons lifted verbatim from 00a1-00a4 register exports.

export const PhoneIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="39.001 33.855 4.584 5.344" width="24" height="24" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
    <path d="M42.043 37.352C41.959 37.286 41.387 36.79 41.031 36.321C40.909 36.18 40.928 36.096 40.984 36.03C41.059 35.945 41.181 35.852 41.246 35.758C41.321 35.645 41.349 35.439 41.246 35.289L40.815 34.671C40.702 34.521 40.59 34.455 40.44 34.455C40.337 34.455 40.234 34.465 39.99 34.671L39.746 34.847C39.464 35.109 39.437 35.046 39.428 35.374C39.41 36.012 40.084 36.864 40.552 37.38C41.049 37.98 42.042 38.786 42.624 38.917C42.811 38.955 42.98 38.945 43.093 38.909C43.337 38.834 43.309 38.855 43.52 38.538L43.743 38.204C43.893 37.848 43.893 38.087 43.865 37.853C43.847 37.768 43.749 37.718 43.684 37.661L43.046 37.137C42.933 37.034 42.736 36.978 42.549 37.089C42.474 37.135 42.315 37.305 42.268 37.343C42.221 37.381 42.137 37.418 42.043 37.352ZM40.749 36.452C40.974 36.762 41.387 37.193 41.828 37.558C41.987 37.689 42.212 37.708 42.38 37.596C42.483 37.53 42.577 37.418 42.643 37.361C42.709 37.304 42.784 37.323 42.821 37.352L43.412 37.821C43.506 37.896 43.531 37.89 43.531 37.965C43.531 38.031 43.496 38.121 43.412 38.214C43.29 38.345 43.102 38.524 42.98 38.58C42.914 38.608 42.858 38.626 42.765 38.627C42.531 38.637 42.249 38.542 41.8 38.252C41.341 37.942 40.806 37.493 40.365 36.94C40.027 36.518 39.681 35.974 39.624 35.627C39.606 35.477 39.634 35.346 39.708 35.243C39.802 35.112 39.942 34.999 40.074 34.877C40.13 34.831 40.215 34.764 40.29 34.765C40.346 34.737 40.487 34.699 40.562 34.821L40.974 35.402C41.02 35.468 41.058 35.552 40.965 35.645L40.778 35.833C40.6 36.011 40.609 36.274 40.749 36.452Z" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.1" />
  </svg>
);

export const ICIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
    <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="11" r="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10h4M14 14h4M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FaceIDIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: '0' }}>
    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10v1M15 10v1M9 15s1 1.5 3 1.5S15 15 15 15" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EmailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.5 166.819 8.25 5.625" width="24" height="24" style={{ height: 'var(--spacing-md)', flexShrink: '0' }}>
    <path d="M17.248 166.882h-7.214c-0.1 0-0.191 0.103-0.19 0.217v5.175c0 0.114 0.091 0.217 0.19 0.215h7.235c0.1 0 0.182-0.103 0.181-0.205v-5.174c0-0.126-0.1-0.227-0.202-0.228z m-0.341 0.343l-3.065 2.837c-0.05 0.046-0.141 0.103-0.23 0.103s-0.151-0.033-0.221-0.091l-3.005-2.849h6.521z m-6.772 0.182l2.361 2.234-2.361 2.302v-4.536z m0.251 4.741l2.351-2.291 0.553 0.502c0.1 0.08 0.221 0.126 0.352 0.125s0.271-0.046 0.371-0.114l0.533-0.513 2.331 2.291h-6.491z m4.391-2.507l2.371-2.234v4.559l-2.371-2.325z" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.2" />
  </svg>
);

export const METHOD_ICON = { phone: PhoneIcon, ic: ICIcon, faceId: FaceIDIcon, email: EmailIcon };
