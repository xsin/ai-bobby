export function BrandMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <rect x="7" y="11" width="18" height="13" rx="4.5" fill="#fff" />
      <circle cx="12.5" cy="17" r="1.7" fill="currentColor" />
      <circle cx="19.5" cy="17" r="1.7" fill="currentColor" />
      <path
        d="M12.8 21.1c1.8 1.2 4.6 1.2 6.4 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M16 6.6v3.1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="5.7" r="1.5" fill="#fff" />
    </svg>
  )
}
