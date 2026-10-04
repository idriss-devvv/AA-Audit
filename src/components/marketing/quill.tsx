/**
 * Plume d'écriture rose, décorative (titre de la page d'accueil) : dégradé
 * rose, barbes fines et bec, avec un léger mouvement d'écriture.
 */
export function Quill({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 96" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="quill-vane" x1="52" y1="4" x2="14" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBCFE8" />
          <stop offset="0.45" stopColor="#F472B6" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
        <linearGradient id="quill-shine" x1="40" y1="10" x2="22" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Vexille (barbes), avec une petite encoche */}
      <path
        d="M56 4C38 8 22 24 15 47c-2.5 8-3.6 15-3.6 21 4.5-6 9.5-10.2 15-13.4l-4.2-.6 8.4-3.6C43 44 52 30 56 4Z"
        fill="url(#quill-vane)"
      />
      <path d="M50 10C36 16 25 30 19.5 47c5-6 12-11.5 19-15C44 25 48 17 50 10Z" fill="url(#quill-shine)" />
      {/* Barbes */}
      <g stroke="#FDF2F8" strokeOpacity="0.75" strokeWidth="0.9" strokeLinecap="round">
        <path d="M44 16 35.5 22" />
        <path d="M47.5 23 37.5 29.5" />
        <path d="M45 34 33 39.5" />
        <path d="M29 20 31.5 30" />
        <path d="M23 32 26.5 41" />
      </g>
      {/* Rachis et calamus */}
      <path d="M55 5C40 22 26 44 13.5 70" stroke="#BE185D" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 70 8.5 84" stroke="#9D174D" strokeWidth="2.2" strokeLinecap="round" />
      {/* Bec et trait d'encre */}
      <path d="M8.5 84 6.6 90.5 10.4 85.6Z" fill="#831843" />
      <path d="M4 92.5c3.5-1 7-.8 10 .2" stroke="#F472B6" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
