import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import CategoryManagement from "../components/Dashboard/CategoryManagement";
import UserManagement from "../components/Dashboard/UserManagement";
import TransactionManagement from "../components/Dashboard/TransactionManagement";

interface User {
  name: string;
  email: string;
  initials: string;
}

const subPathTitles: Record<string, string> = {
  "/": "Dashboard",
  "/category": "Category",
  "/user": "User",
  "/transaction": "Transaction",
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const subPath = location.pathname.replace("/dashboard", "") || "/";

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Buat Initials dari username
      const initials = parsedUser.username
        ? parsedUser.username.charAt(0).toUpperCase()
        : parsedUser.username.charAt(0).toUpperCase();
      setUser({
        name: parsedUser.username || "User",
        email: parsedUser.email,
        initials,
      });
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Sidebar */}
      <Sidebar
        activePath={subPath}
        onNavigate={(path) => navigate(`/dashboard${path}`)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex flex-col flex-grow overflow-auto">
        {user && (
          <Header
            user={user}
            onLogout={handleLogout}
            onNavigate={(path) => navigate(`/dashboard${path}`)}
            onMenuToggle={toggleSidebar}
            activeTitle={subPathTitles[subPath] || "Dashboard"}
          />
        )}

        <main className="p-4 sm:p-6 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="p-6 bg-white rounded-2xl shadow-lg text-gray-400 text-center">
                  Dashboard Overview
                </div>
              }
            />
            <Route path="category/*" element={<CategoryManagement />} />
            <Route path="user/*" element={<UserManagement />} />
            <Route path="transaction/*" element={<TransactionManagement />} />

            {/* 404 khusus dashboard */}
            <Route
              path="*"
              element={
                <div className="p-6 bg-white rounded-2xl shadow-lg text-red-500 text-center">
                  404 - Page Not Found in Dashboard
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
