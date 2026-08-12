import client from "./client";

export async function registerUser({ email, password }) {
  const { data } = await client.post("/auth/register", { email, password });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await client.post("/auth/login", { email, password });
  return data;
}

export async function requestPasswordReset({ email }) {
  const { data } = await client.post("/auth/forgot-password", { email });
  return data;
}
