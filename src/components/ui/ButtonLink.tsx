import type React from "react";
import { Link } from "react-router";

interface ButtonLinkProps {
  to: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark";
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  to,
  children,
  variant = "primary",
  className,
}) => {
  const baseClasses =
    "px-6 py-3 rounded-xl !text-white font-semibold text-center shadow-md hover:scale-105 transition-transform duration-300 ease-in-out";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black", // teks hitam biar kontras
    info: "bg-cyan-500 hover:bg-cyan-600",
    dark: "bg-gray-800 hover:bg-gray-900",
  }[variant];

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </Link>
  );
};

export default ButtonLink;
