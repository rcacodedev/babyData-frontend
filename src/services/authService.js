import api from "@/lib/api";

export async function login(email, password) {
  const { data } = await api.post("/auth/login/", { email, password });
  // Esperamos { access, refresh, user }
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export async function me() {
  const { data } = await api.get("/auth/me/");
  return data;
}
