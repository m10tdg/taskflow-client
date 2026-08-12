import { Link } from "react-router-dom";
import { MoreVertical, Trash2, Pencil } from "lucide-react";
import { useState } from "react";

export default function ProjectCard({ project, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-surface border border-line rounded-lg p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <Link to={`/projects/${project.id}`} className="block flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base truncate">{project.name}</h3>
          {project.description && (
            <p className="text-sm text-ink/60 mt-1 line-clamp-2">{project.description}</p>
          )}
        </Link>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Project options"
            className="text-ink/40 hover:text-ink p-1"
          >
            <MoreVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 bg-surface border border-line rounded-md shadow-md w-36 py-1">
              <button
                onClick={() => { setMenuOpen(false); onEdit(project); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-paper"
              >
                <Pencil size={14} /> Edit
              </button>
              <button
                onClick={() => { setMenuOpen(false); onDelete(project); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-priority-high hover:bg-priority-highBg"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-xs text-ink/40 font-mono">
        {project.taskCount ?? 0} task{project.taskCount === 1 ? "" : "s"}
      </div>
    </div>
  );
}
