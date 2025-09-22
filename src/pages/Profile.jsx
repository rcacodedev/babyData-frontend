// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { me, updateMe } from "@/services/authService";

export default function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    last_name_2: "",
    profile: {
      phone: "",
      address_line: "",
      address_line2: "",
      city: "",
      province: "",
      postal_code: "",
      country: "ES",
    },
  });

  const [status, setStatus] = useState({ ok: "", err: "" });

  useEffect(() => {
    if (!data) return;
    setForm({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      last_name_2: data.last_name_2 || "",
      profile: {
        phone: data.profile?.phone || "",
        address_line: data.profile?.address_line || "",
        address_line2: data.profile?.address_line2 || "",
        city: data.profile?.city || "",
        province: data.profile?.province || "",
        postal_code: data.profile?.postal_code || "",
        country: data.profile?.country || "ES",
      },
    });
  }, [data]);

  const mutate = useMutation({
    mutationFn: (payload) => updateMe(payload),
    onSuccess: () =>
      setStatus({ ok: "Perfil actualizado correctamente.", err: "" }),
    onError: (e) =>
      setStatus({
        ok: "",
        err:
          e?.response?.data?.detail ||
          "No se pudo guardar. Revisa los campos e inténtalo de nuevo.",
      }),
  });

  function onChangeUser(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function onChangeProfile(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, profile: { ...f.profile, [name]: value } }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setStatus({ ok: "", err: "" });
    // Enviamos solo lo que toca; el backend acepta parcial (partial=True)
    mutate.mutate(form);
  }

  if (isLoading)
    return <div className="p-6 text-gray-600">Cargando perfil…</div>;
  if (isError)
    return <div className="p-6 text-red-600">No se pudo cargar tu perfil.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Mi perfil</h1>

      {status.ok && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {status.ok}
        </div>
      )}
      {status.err && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {status.err}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="rounded-xl bg-white p-4 shadow">
          <h2 className="text-lg font-medium text-indigo-600 mb-3">
            Datos de usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={onChangeUser}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Primer apellido</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={onChangeUser}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Apellido 1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Segundo apellido</label>
              <input
                name="last_name_2"
                value={form.last_name_2}
                onChange={onChangeUser}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Apellido 2"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 shadow">
          <h2 className="text-lg font-medium text-indigo-600 mb-3">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Teléfono</label>
              <input
                name="phone"
                value={form.profile.phone}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">País</label>
              <input
                name="country"
                value={form.profile.country}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="ES"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Dirección</label>
              <input
                name="address_line"
                value={form.profile.address_line}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Calle, nº"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                Dirección (línea 2)
              </label>
              <input
                name="address_line2"
                value={form.profile.address_line2}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Piso, puerta…"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ciudad</label>
              <input
                name="city"
                value={form.profile.city}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Ciudad"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Provincia</label>
              <input
                name="province"
                value={form.profile.province}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Provincia"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Código postal</label>
              <input
                name="postal_code"
                value={form.profile.postal_code}
                onChange={onChangeProfile}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="CP"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutate.isPending}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {mutate.isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
