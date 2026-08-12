import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ProjectFormModal({ open, initialProject, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialProject?.name || "");
      setDescription(initialProject?.description || "");
      setError("");
    }
  }, [open, initialProject]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({ name: name.trim(), description: description.trim() });
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initialProject ? "Edit project" : "New project"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="project-name"
          label="Name"
          value={name}
          maxLength={100}
          onChange={(e) => setName(e.target.value)}
          error={error}
          autoFocus
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="project-desc" className="text-sm font-medium text-ink/80">Description</label>
          <textarea
            id="project-desc"
            rows={3}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 resize-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </Modal>
  );
}
