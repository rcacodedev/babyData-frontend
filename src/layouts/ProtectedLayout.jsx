import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
