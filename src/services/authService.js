// src/services/authService.js
import api from "@/lib/api";

// === Tokens ===
export function getAccessToken() {
  return localStorage.getItem("access");
}
export function getRefreshToken() {
  return localStorage.getItem("refresh");
}
export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
}
export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// === Auth ===
export async function register(payload) {
  // payload: { email, first_name?, last_name?, last_name_2?, password }
  const { data } = await api.post("/auth/register/", payload);
  return data; // user creado
}

export async function login(email, password) {
  const { data } = await api.post("/auth/login/", { email, password });
  // { access, refresh }
  setTokens({ access: data.access, refresh: data.refresh });
  return data;
}

export async function logout() {
  // Blacklist del refresh en backend (opcional pero recomendable)
  const refresh = getRefreshToken();
  if (refresh) {
    try {
      await api.post("/auth/logout/", { refresh });
    } catch (_) {
      // ignora errores de logout
    }
  }
  clearTokens();
}

export async function refreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");
  const { data } = await api.post("/auth/refresh/", { refresh });
  setTokens({ access: data.access });
  return data.access;
}

// === Usuario actual ===
export async function me() {
  const { data } = await api.get("/auth/me/");
  return data; // {id, email, first_name,..., profile: {...}}
}

export async function updateMe(partial) {
  // partial: { first_name?, last_name?, last_name_2?, profile?: {...} }
  const { data } = await api.patch("/auth/me/", partial);
  return data;
}

// === Passwords ===
export async function requestPasswordReset(email) {
  // devuelve 200 aunque el email no exista (por seguridad)
  const { data } = await api.post("/auth/password-reset/", { email });
  return data;
}

export async function confirmPasswordReset({ uid, token, new_password }) {
  const { data } = await api.post("/auth/password-reset/confirm/", {
    uid,
    token,
    new_password,
  });
  return data;
}

export async function changePassword({ current_password, new_password }) {
  // si montas endpoint /auth/password-change/ (opcional)
  const { data } = await api.post("/auth/password-change/", {
    current_password,
    new_password,
  });
  return data;
}
