import client from "./client";

export async function fetchTasks(projectId, filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  if (filters.assigneeId) params.set("assigneeId", filters.assigneeId);
  if (filters.q) params.set("q", filters.q);
  const { data } = await client.get(`/projects/${projectId}/tasks?${params.toString()}`);
  return data;
}

export async function createTask(projectId, task) {
  const { data } = await client.post(`/projects/${projectId}/tasks`, task);
  return data;
}

export async function updateTask(taskId, updates) {
  const { data } = await client.put(`/tasks/${taskId}`, updates);
  return data;
}

export async function updateTaskStatus(taskId, status) {
  const { data } = await client.patch(`/tasks/${taskId}/status`, { status });
  return data;
}

export async function deleteTask(taskId) {
  await client.delete(`/tasks/${taskId}`);
}
