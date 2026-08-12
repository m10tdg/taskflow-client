export default function Spinner({ className = "" }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-line border-t-brand h-6 w-6 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
