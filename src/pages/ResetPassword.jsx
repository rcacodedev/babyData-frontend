// src/pages/ResetPassword.jsx
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  requestPasswordReset,
  confirmPasswordReset,
} from "@/services/authService";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const uid = params.get("uid");
  const token = params.get("token");
  const isConfirm = useMemo(() => !!uid && !!token, [uid, token]);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRequest(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setOk("Si existe la cuenta, recibirás un email con instrucciones.");
    } catch {
      setErr("No se pudo iniciar el proceso. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function onConfirm(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);
    try {
      await confirmPasswordReset({ uid, token, new_password: pwd });
      setOk("Contraseña actualizada. Ya puedes iniciar sesión.");
    } catch {
      setErr("Enlace inválido o caducado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-1">
          {isConfirm ? "Nueva contraseña" : "Recuperar contraseña"}
        </h1>
        <p className="text-gray-500 mb-6">BabyData</p>

        {ok && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {ok}
          </div>
        )}
        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {!isConfirm ? (
          <form onSubmit={onRequest} className="space-y-4">
            <input
              className="w-full rounded-xl border px-3 py-2"
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        ) : (
          <form onSubmit={onConfirm} className="space-y-4">
            <input
              className="w-full rounded-xl border px-3 py-2"
              type="password"
              placeholder="Nueva contraseña"
              minLength={8}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium disabled:opacity-60"
            >
              {loading ? "Actualizando..." : "Guardar contraseña"}
            </button>
          </form>
        )}

        <div className="mt-4 text-sm">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
}
