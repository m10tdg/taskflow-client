export default function Input({ label, error, helpText, id, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`px-3 py-2 rounded-md border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40
          ${error ? "border-priority-high" : "border-line"} ${className}`}
        aria-invalid={!!error}
        {...props}
      />
      {error ? (
        <span className="text-xs text-priority-high">{error}</span>
      ) : helpText ? (
        <span className="text-xs text-ink/50">{helpText}</span>
      ) : null}
    </div>
  );
}
