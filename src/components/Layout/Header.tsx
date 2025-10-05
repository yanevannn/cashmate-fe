import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User as UserIcon, KeyRound, Menu } from "lucide-react";
import { navigateAndCloseDropdown } from "../../utils/navigation";
import type { ProfileMenuItem } from "../../utils/navigation";

interface User {
  name: string;
  email: string;
  initials: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  onMenuToggle: () => void;
  activeTitle: string;
}

const profileMenuItems: ProfileMenuItem[] = [
  { name: "Profile", icon: UserIcon, path: "/profile" },
  { name: "Change Password", icon: KeyRound, path: "/change-password" },
  { name: "Logout", icon: LogOut, path: "/logout", isLogout: true },
];

const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onNavigate,
  onMenuToggle,
  activeTitle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (item: ProfileMenuItem) => {
    setIsDropdownOpen(false);
    navigateAndCloseDropdown(item, onLogout, onNavigate);
  };

  return (
    <header className="flex justify-between items-center h-16 px-4 sm:px-6 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 mr-3 rounded-full text-gray-700 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{activeTitle}</h2>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-2">
            {user.initials}
          </div>
          <span className="hidden sm:inline text-sm font-medium text-gray-700 mr-1">
            {user.name}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-20">
            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
              Signed in as{" "}
              <span className="font-semibold text-blue-600 block">
                {user.email}
              </span>
            </div>
            {profileMenuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleAction(item)}
                className={`w-full text-left flex items-center px-4 py-2 text-sm ${
                  item.isLogout
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
