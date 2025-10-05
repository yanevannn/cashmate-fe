import React from "react";
import { LayoutGrid, Users, Receipt, LogOut, X, LayoutList } from "lucide-react";

interface SidebarItem {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  path: string;
}

interface SidebarProps {
  activePath: string;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutGrid, path: "/" },
  { name: "Category", icon: LayoutList, path: "/category" },
  { name: "User", icon: Users, path: "/user" },
  { name: "Transaction", icon: Receipt, path: "/transaction" },
];

const Sidebar: React.FC<SidebarProps> = ({
  activePath,
  onLogout,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const handleNavigation = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`flex flex-col h-full w-64 bg-white border-r border-gray-100 shadow-xl flex-shrink-0
          fixed inset-y-0 left-0 transform transition-transform duration-300 z-50 
          lg:static lg:translate-x-0 lg:shadow-md
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center text-2xl font-bold text-blue-700 border-b border-blue-50">
          CashMate
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-full text-left flex items-center p-3 rounded-xl transition-colors duration-200 ${
                activePath === item.path
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-50">
          <button
            onClick={onLogout}
            className="w-full flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
