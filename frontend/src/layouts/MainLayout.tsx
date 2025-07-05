// src/layouts/MainLayout.tsx
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MANDATORY_CHANGE_PASSWORD_PATH, DASHBOARD_PATH, LOGIN_PATH, PROFILE_PATH, USERS_PATH } from "../constants/PathConstants";

export default function MainLayout() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>

      {/* Navbar */}
      {
        pathname != MANDATORY_CHANGE_PASSWORD_PATH &&
          <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Weigraph</h1>
            <nav className="flex gap-4">
              <Link to={DASHBOARD_PATH} className="hover:underline">Home</Link>
              {isAdmin && <Link to={USERS_PATH} className="hover:underline">Users</Link>}
              <Link to={PROFILE_PATH} className="hover:underline">Profile</Link>
              <button onClick={() => { logout(); navigate(LOGIN_PATH); }} className="hover:underline">Logout</button>
            </nav>
          </header>
      }

      {/* Contenido */}
      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
}
