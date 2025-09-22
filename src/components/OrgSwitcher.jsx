// src/components/OrgSwitcher.jsx
import { useEffect, useState } from "react";
import {
  listOrganizations,
  selectCurrentOrganization,
} from "@/services/orgService";

export default function OrgSwitcher({ onChanged }) {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await listOrganizations();
        setOrgs(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSelect(e) {
    const orgId = e.target.value;
    if (!orgId) return;
    await selectCurrentOrganization(orgId);
    onChanged?.(orgId);
  }

  if (loading)
    return <div className="text-sm text-gray-500">Cargando orgs…</div>;
  if (!orgs.length)
    return <div className="text-sm text-gray-500">Sin organizaciones</div>;

  return (
    <select onChange={onSelect} className="rounded-xl border px-3 py-2 text-sm">
      <option value="">Selecciona organización…</option>
      {orgs.map((o) => (
        <option key={o.id} value={o.id}>
          {o.nombre}
        </option>
      ))}
    </select>
  );
}
