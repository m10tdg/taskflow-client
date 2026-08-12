import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { STATUS_STYLES, PRIORITY_STYLES } from "../../utils/constants";
import { formatDate, isOverdue } from "../../utils/dateHelpers";
import { Pencil, Trash2 } from "lucide-react";

export default function TaskDetailModal({ open, task, onClose, onEdit, onDelete }) {
  if (!task) return null;
  const overdue = isOverdue(task.dueDate, task.status);
  const statusStyle = STATUS_STYLES[task.status] || {};
  const priorityStyle = PRIORITY_STYLES[task.priority] || {};

  return (
    <Modal open={open} onClose={onClose} title="Task details">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg">{task.title}</h3>
          {task.description && <p className="text-sm text-ink/60 mt-2 whitespace-pre-wrap">{task.description}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge text={task.status} textClass={statusStyle.text} bgClass={statusStyle.bg} />
          {task.priority && <Badge text={task.priority} textClass={priorityStyle.text} bgClass={priorityStyle.bg} />}
          {overdue && <Badge text="Overdue" textClass="text-priority-high" bgClass="bg-priority-highBg" />}
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-ink/50 text-xs">Due date</dt>
            <dd className="font-mono">{task.dueDate ? formatDate(task.dueDate) : "—"}</dd>
          </div>
          <div>
            <dt className="text-ink/50 text-xs">Assignee</dt>
            <dd>{task.assigneeName || "Unassigned"}</dd>
          </div>
        </dl>

        <div className="flex justify-between pt-2 border-t border-line">
          <Button variant="danger" onClick={() => onDelete(task)}>
            <Trash2 size={14} /> Delete
          </Button>
          <Button onClick={() => onEdit(task)}>
            <Pencil size={14} /> Edit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
