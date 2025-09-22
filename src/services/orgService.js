// src/services/orgService.js
import api from "@/lib/api";

// Organizaciones
export async function listOrganizations() {
  const { data } = await api.get("/auth/orgs/");
  return data; // [{id, nombre, owner, created_at}, ...]
}

export async function createOrganization(nombre) {
  const { data } = await api.post("/auth/orgs/", { nombre });
  return data;
}

export async function selectCurrentOrganization(orgId) {
  const { data } = await api.post(`/auth/orgs/${orgId}/select/`);
  return data;
}

// Miembros (org actual)
export async function listMembers() {
  const { data } = await api.get("/auth/orgs/members/");
  return data; // [{id, user, user_email, organization, role}, ...]
}

export async function addMember({ email, role }) {
  const { data } = await api.post("/auth/orgs/members/add/", { email, role });
  return data;
}

export async function updateMemberRole(memberId, role) {
  const { data } = await api.patch(`/auth/orgs/members/${memberId}/`, { role });
  return data;
}

export async function removeMember(memberId) {
  await api.delete(`/auth/orgs/members/${memberId}/remove/`);
}
