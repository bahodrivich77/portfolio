/**
 * ✅ GovBackground — will-change: transform qo'shildi
 * Blob animatsiyalar GPU ga o'tkazildi
 */
export default function GovBackground() {
  return (
    <div
      className="gov-background fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="gov-soft-blob gov-blob-1" />
      <div className="gov-soft-blob gov-blob-2" />
      <div className="gov-soft-blob gov-blob-3" />
    </div>
  )
}
