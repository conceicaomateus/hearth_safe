"use client";

import { BookText, LayoutDashboard, LogOut, Users } from "lucide-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../../context/auth-context";

export function AuthLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-gray-100 border-r border-gray-800 flex flex-col">
        <div className="p-8 text-center border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-wide">API Control</h1>
        </div>
        <nav className="space-y-1 px-2 flex-1 mt-4">
          <Link
            to="/home"
            className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/documentation"
            className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <BookText className="mr-3 h-5 w-5" />
            Documentação
          </Link>
          <Link
            to="/users"
            className="flex items-center rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <Users className="mr-3 h-5 w-5" />
            Usuários
          </Link>
        </nav>
        <div className="mt-auto mb-4 w-64 px-2">
          <button
            onClick={logout}
            className="flex w-full items-center rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-950">
        <main className="p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
