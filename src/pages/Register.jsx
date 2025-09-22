// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, login } from "@/services/authService";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    last_name_2: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register(form);
      await login(form.email, form.password); // autologin
      nav("/", { replace: true });
    } catch (error) {
      setErr(error.response?.data?.detail || "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-1">Crear cuenta</h1>
        <p className="text-gray-500 mb-6">BabyData</p>
        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2"
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="rounded-xl border px-3 py-2"
              name="first_name"
              placeholder="Nombre"
              onChange={onChange}
            />
            <input
              className="rounded-xl border px-3 py-2"
              name="last_name"
              placeholder="Primer apellido"
              onChange={onChange}
            />
          </div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            name="last_name_2"
            placeholder="Segundo apellido"
            onChange={onChange}
          />
          <input
            className="w-full rounded-xl border px-3 py-2"
            name="password"
            type="password"
            placeholder="Contraseña (min 8)"
            minLength={8}
            onChange={onChange}
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
