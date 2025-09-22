import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, me } from "@/services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      // Prefetch opcional del usuario
      await me().catch(() => {});
      navigate(from, { replace: true });
    } catch (error) {
      const msg =
        error.response?.status === 401
          ? "Credenciales inválidas."
          : "Error al iniciar sesión. Inténtalo de nuevo.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">BabyData</h1>
            <p className="text-gray-500 mt-1">Accede a tu cuenta</p>
          </div>

          {err && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="tucorreo@dominio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPwd ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link
              to="/reset-password"
              className="text-indigo-600 hover:underline"
            >
              ¿Has olvidado tu contraseña?
            </Link>
            <Link to="/register" className="text-gray-600 hover:underline">
              Crear cuenta
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Al continuar aceptas nuestros Términos y la Política de privacidad.
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          v{import.meta.env.VITE_APP_VERSION || "0.1.0"}
        </p>
      </div>
    </div>
  );
}
