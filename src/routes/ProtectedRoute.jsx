import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const hasToken = !!localStorage.getItem("access");
  const loc = useLocation();
  if (!hasToken) return <Navigate to="/login" replace state={{ from: loc }} />;
  return <Outlet />;
}
