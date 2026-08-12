import TaskCard from "./TaskCard";
import { TASK_STATUSES, STATUS_STYLES } from "../../utils/constants";
import EmptyState from "../ui/EmptyState";

export default function TaskBoard({ tasks, onTaskClick, onStatusChange }) {
  const columns = TASK_STATUSES.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create your first task to start tracking work in this project."
      />
    );
  }

  function handleDrop(e, status) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/task-id");
    if (taskId) onStatusChange(taskId, status);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(({ status, tasks: colTasks }) => {
        const style = STATUS_STYLES[status];
        return (
          <div
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
            className="bg-paper rounded-lg border border-line p-3 min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded ${style.text} ${style.bg}`}>
                {status}
              </span>
              <span className="text-xs text-ink/40 font-mono">{colTasks.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/task-id", task.id)}
                >
                  <TaskCard task={task} onClick={onTaskClick} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
