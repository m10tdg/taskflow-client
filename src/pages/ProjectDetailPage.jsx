import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import { fetchProject } from "../api/projects";
import { fetchTasks, createTask, updateTask, updateTaskStatus, deleteTask } from "../api/tasks";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskFormModal from "../components/tasks/TaskFormModal";
import TaskDetailModal from "../components/tasks/TaskDetailModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", priority: "", assigneeId: "", q: "" });

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const loadTasks = useCallback(async () => {
    setTasks(await fetchTasks(projectId, filters));
  }, [projectId, filters]);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const p = await fetchProject(projectId);
      setProject(p);
      await loadTasks();
      setLoading(false);
    }
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    if (!loading) loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  async function handleSubmit(data) {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(projectId, data);
    }
    await loadTasks();
  }

  async function handleStatusChange(taskId, status) {
    await updateTaskStatus(taskId, status);
    await loadTasks();
  }

  async function handleDelete() {
    await deleteTask(deletingTask.id);
    setDeletingTask(null);
    setDetailTask(null);
    await loadTasks();
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Spinner /></div>;
  }

  return (
    <div className="p-4 md:p-8 flex flex-col gap-5">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink mb-2">
          <ChevronLeft size={16} /> Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-xl">{project.name}</h2>
            {project.description && <p className="text-sm text-ink/60 mt-1">{project.description}</p>}
          </div>
          <Button onClick={() => { setEditingTask(null); setFormOpen(true); }}>
            <Plus size={16} /> New task
          </Button>
        </div>
      </div>

      <TaskFilters filters={filters} onChange={setFilters} members={project.members || []} />

      <TaskBoard
        tasks={tasks}
        onTaskClick={(t) => setDetailTask(t)}
        onStatusChange={handleStatusChange}
      />

      <TaskFormModal
        open={formOpen}
        initialTask={editingTask}
        members={project.members || []}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <TaskDetailModal
        open={!!detailTask}
        task={detailTask}
        onClose={() => setDetailTask(null)}
        onEdit={(t) => { setDetailTask(null); setEditingTask(t); setFormOpen(true); }}
        onDelete={(t) => setDeletingTask(t)}
      />

      <ConfirmDialog
        open={!!deletingTask}
        title="Delete task"
        message={`Delete "${deletingTask?.title}"? This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
