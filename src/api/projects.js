import client from "./client";

export async function fetchProjects() {
  const { data } = await client.get("/projects");
  return data;
}

export async function fetchProject(projectId) {
  const { data } = await client.get(`/projects/${projectId}`);
  return data;
}

export async function createProject({ name, description }) {
  const { data } = await client.post("/projects", { name, description });
  return data;
}

export async function updateProject(projectId, { name, description }) {
  const { data } = await client.put(`/projects/${projectId}`, { name, description });
  return data;
}

export async function deleteProject(projectId) {
  await client.delete(`/projects/${projectId}`);
}
