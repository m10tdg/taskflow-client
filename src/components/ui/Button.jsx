export default function Button({ variant = "primary", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "bg-paper text-ink border border-line hover:bg-line/60",
    danger: "bg-priority-high text-white hover:opacity-90",
    ghost: "text-ink/70 hover:bg-paper",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
