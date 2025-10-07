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
                <>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Layout cards sudah responsive dengan grid-cols-1/2/4 */}
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-blue-600">
                          Total Users
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          2,450
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          +12% from last month
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-blue-600">
                          Total Transactions
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          15,890
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          -5% from last week
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-blue-600">
                          Revenue
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          Rp 120M
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Target reached
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-blue-600">
                          Active Categories
                        </p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">
                          45
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          New: Electronics
                        </p>
                      </div>
                    </div>
                    {/* Layout grafik/tabel juga responsif: grid-cols-1 di mobile, lg:grid-cols-3 di desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-96">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Latest Transactions
                        </h3>
                        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                          Placeholder: Grafik atau Tabel Transaksi
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          User Activity
                        </h3>
                        <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                          Placeholder: Detail Aktivitas User
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Additional Data
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Area ini bisa digunakan untuk informasi lain seperti
                        daftar kategori atau notifikasi sistem.
                      </p>
                    </div>
                  </div>
                </>
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
