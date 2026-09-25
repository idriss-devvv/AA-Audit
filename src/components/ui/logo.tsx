/**
 * Logotype A&A Audit : monogramme (bulletin + coche) et nom en typographie
 * éditoriale. Purement présentationnel.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-[10px] bg-blue-600 text-beige-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_14px_-6px_rgba(16,34,62,0.6)] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[58%] w-[58%]" aria-hidden>
        <path
          d="M6.5 3.5h8l3 3v13a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinejoin="round"
          opacity={0.55}
        />
        <path
          d="m8.5 13 2.4 2.4 4.8-5.2"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className = "",
  size = "md",
  tone = "dark",
}: {
  className?: string;
  size?: "sm" | "md";
  tone?: "dark" | "light";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={size === "sm" ? "h-7 w-7" : "h-8 w-8"} />
      <span
        className={`font-display tracking-tight ${size === "sm" ? "text-xl" : "text-[1.4rem]"} ${
          tone === "light" ? "text-beige-50" : "text-ink-900"
        }`}
      >
        A&A Audit
      </span>
    </span>
  );
}
