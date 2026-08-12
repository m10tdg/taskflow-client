import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../utils/constants";

export default function TaskFormModal({ open, initialTask, members = [], onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", priority: "Medium", status: "To Do", assigneeId: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        title: initialTask?.title || "",
        description: initialTask?.description || "",
        dueDate: initialTask?.dueDate ? initialTask.dueDate.slice(0, 10) : "",
        priority: initialTask?.priority || "Medium",
        status: initialTask?.status || "To Do",
        assigneeId: initialTask?.assigneeId || "",
      });
      setError("");
    }
  }, [open, initialTask]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({ ...form, title: form.title.trim() });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initialTask ? "Edit task" : "New task"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input id="task-title" label="Title" value={form.title} maxLength={150}
          onChange={(e) => update("title", e.target.value)} error={error} autoFocus />

        <div className="flex flex-col gap-1">
          <label htmlFor="task-desc" className="text-sm font-medium text-ink/80">Description</label>
          <textarea id="task-desc" rows={3} value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input id="task-due" label="Due date" type="date" value={form.dueDate}
            onChange={(e) => update("dueDate", e.target.value)} />

          <div className="flex flex-col gap-1">
            <label htmlFor="task-priority" className="text-sm font-medium text-ink/80">Priority</label>
            <select id="task-priority" value={form.priority} onChange={(e) => update("priority", e.target.value)}
              className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40">
              {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="task-status" className="text-sm font-medium text-ink/80">Status</label>
            <select id="task-status" value={form.status} onChange={(e) => update("status", e.target.value)}
              className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40">
              {TASK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="task-assignee" className="text-sm font-medium text-ink/80">Assignee</label>
            <select id="task-assignee" value={form.assigneeId} onChange={(e) => update("assigneeId", e.target.value)}
              className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40">
              <option value="">Unassigned</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.email}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
