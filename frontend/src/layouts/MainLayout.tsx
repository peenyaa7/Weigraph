// src/layouts/MainLayout.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div>

      {/* Navbar */}
      <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Weigraph</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          {isAdmin && <Link to="/users" className="hover:underline">Users</Link>}
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button onClick={() => { logout(); navigate("/login"); }} className="hover:underline">Logout</button>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
}
