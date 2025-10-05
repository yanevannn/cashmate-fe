import ButtonLink from "../ui/ButtonLink";

const Header = () => {
  return (
    <>
      <header className="max-w-6xl mx-auto p-4 sm:p-6 flex justify-between items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
          CashMate
        </h1>
        <nav className="space-x-4 text-sm sm:text-base">
          <ButtonLink to="/login" variant="success">
            Login
          </ButtonLink>
          <ButtonLink to="/register" variant="primary">
            Register
          </ButtonLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
