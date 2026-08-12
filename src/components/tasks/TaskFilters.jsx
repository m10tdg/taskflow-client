import { Search } from "lucide-react";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../utils/constants";

export default function TaskFilters({ filters, onChange, members = [] }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[180px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={filters.q}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
        className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      >
        <option value="">All statuses</option>
        {TASK_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => update("priority", e.target.value)}
        className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      >
        <option value="">All priorities</option>
        {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <select
        value={filters.assigneeId}
        onChange={(e) => update("assigneeId", e.target.value)}
        className="px-3 py-2 rounded-md border border-line bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      >
        <option value="">All assignees</option>
        {members.map((m) => <option key={m.id} value={m.id}>{m.email}</option>)}
      </select>
    </div>
  );
}
