/* VELAR / ONE — mirrors the stacked VELAR / CLOUD mark of the parent brand. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="text-[19px] font-semibold tracking-[0.28em] [margin-right:-0.28em]">VELAR</span>
      <span className="mt-1 text-[8px] font-medium tracking-[0.6em] [margin-right:-0.6em]">ONE</span>
    </span>
  )
}
