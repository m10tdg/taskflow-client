import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { fetchProjects, createProject, updateProject, deleteProject } from "../api/projects";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectFormModal from "../components/projects/ProjectFormModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  async function load() {
    setLoading(true);
    setProjects(await fetchProjects());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(data) {
    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await createProject(data);
    }
    await load();
  }

  async function handleDelete() {
    await deleteProject(deletingProject.id);
    setDeletingProject(null);
    await load();
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-xl">Projects</h2>
        <Button onClick={() => { setEditingProject(null); setFormOpen(true); }}>
          <Plus size={16} /> New project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start organizing tasks."
          action={<Button onClick={() => setFormOpen(true)}><Plus size={16} /> New project</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={(p) => { setEditingProject(p); setFormOpen(true); }}
              onDelete={(p) => setDeletingProject(p)}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        open={formOpen}
        initialProject={editingProject}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deletingProject}
        title="Delete project"
        message={`Delete "${deletingProject?.name}"? This will also delete all of its tasks. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingProject(null)}
      />
    </div>
  );
}
