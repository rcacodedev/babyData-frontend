import { Link, useNavigate } from "react-router-dom";
import OrgSwitcher from "@/components/OrgSwitcher";
import { logout } from "@/services/authService";

export default function Navbar() {
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shadow-sm">
      {/* Logo / brand */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-indigo-600">BabyData</span>
      </div>

      {/* Centro: switcher */}
      <div className="flex-1 flex justify-center">
        <OrgSwitcher onChanged={() => window.location.reload()} />
      </div>

      {/* Derecha: perfil + logout */}
      <div className="flex items-center gap-4">
        <Link
          to="/profile"
          className="text-sm text-gray-600 hover:text-indigo-600"
        >
          Mi perfil
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
        >
          Salir
        </button>
      </div>
    </nav>
  );
}
