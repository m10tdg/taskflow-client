import { Calendar, User } from "lucide-react";
import Badge from "../ui/Badge";
import { PRIORITY_STYLES } from "../../utils/constants";
import { formatDate, isOverdue } from "../../utils/dateHelpers";

export default function TaskCard({ task, onClick }) {
  const overdue = isOverdue(task.dueDate, task.status);
  const priorityStyle = PRIORITY_STYLES[task.priority] || {};

  return (
    <button
      onClick={() => onClick(task)}
      className="w-full text-left bg-surface border border-line rounded-lg p-3.5 hover:shadow-sm hover:border-brand/40 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium leading-snug">{task.title}</h4>
        {task.priority && (
          <Badge text={task.priority} textClass={priorityStyle.text} bgClass={priorityStyle.bg} />
        )}
      </div>

      <div className="flex items-center gap-3 mt-3 text-xs text-ink/50">
        {task.dueDate && (
          <span className={`flex items-center gap-1 font-mono ${overdue ? "text-priority-high font-medium" : ""}`}>
            <Calendar size={12} />
            {formatDate(task.dueDate)}
            {overdue && " · Overdue"}
          </span>
        )}
        {task.assigneeName && (
          <span className="flex items-center gap-1">
            <User size={12} />
            {task.assigneeName}
          </span>
        )}
      </div>
    </button>
  );
}
