export function BrandMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#1e4fff" />
      <path
        d="M10 20.5V11.5h5.2c3.2 0 5.3 1.8 5.3 4.5s-2.1 4.5-5.3 4.5H10Z"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 16h5.1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="23.5" cy="9" r="1.5" fill="#8ff7ff" />
    </svg>
  )
}
