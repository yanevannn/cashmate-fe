import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <header className="max-w-6xl mx-auto p-4 sm:p-6 flex justify-between items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
          CashMate
        </h1>
        <nav className="space-x-4 text-sm sm:text-base">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 !text-white font-semibold text-center shadow-md hover:from-green-600 hover:to-green-700 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 !text-white font-semibold text-center shadow-md hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Register
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
