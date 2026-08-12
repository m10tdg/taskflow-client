import { Menu } from "lucide-react";

export default function Topbar({ title, onMenuClick, actions }) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-line bg-surface">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-ink/70" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}
