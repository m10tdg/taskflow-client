import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../api/projects";
import { fetchTasks } from "../api/tasks";
import Spinner from "../components/ui/Spinner";
import Badge from "../components/ui/Badge";
import { STATUS_STYLES } from "../utils/constants";
import { formatDate, isOverdue } from "../utils/dateHelpers";
import { AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ "To Do": 0, "In Progress": 0, Done: 0 });
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const projects = await fetchProjects();
      const allTasks = (
        await Promise.all(projects.map((p) => fetchTasks(p.id).catch(() => [])))
      ).flat();

      const nextCounts = { "To Do": 0, "In Progress": 0, Done: 0 };
      allTasks.forEach((t) => { nextCounts[t.status] = (nextCounts[t.status] || 0) + 1; });
      setCounts(nextCounts);
      setOverdueTasks(allTasks.filter((t) => isOverdue(t.dueDate, t.status)));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-16"><Spinner /></div>;
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(counts).map(([status, count]) => {
          const style = STATUS_STYLES[status];
          return (
            <div key={status} className="bg-surface border border-line rounded-lg p-5">
              <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded ${style.text} ${style.bg}`}>
                {status}
              </span>
              <p className="font-display text-3xl font-semibold mt-3">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-surface border border-line rounded-lg">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-line">
          <AlertTriangle size={16} className="text-priority-high" />
          <h2 className="font-semibold text-sm">Overdue tasks</h2>
        </div>
        {overdueTasks.length === 0 ? (
          <p className="text-sm text-ink/50 px-5 py-6">Nothing overdue. You're on track.</p>
        ) : (
          <ul className="divide-y divide-line">
            {overdueTasks.map((task) => (
              <li key={task.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <Link to={`/projects/${task.projectId}`} className="text-sm font-medium hover:underline">
                    {task.title}
                  </Link>
                  <p className="text-xs text-ink/50 font-mono mt-0.5">Due {formatDate(task.dueDate)}</p>
                </div>
                <Badge text={task.status} textClass={STATUS_STYLES[task.status].text} bgClass={STATUS_STYLES[task.status].bg} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
