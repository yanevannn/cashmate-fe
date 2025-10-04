import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
        <Header />
        <main className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-24 w-full">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
            Smart Way to Track Your Money 💰
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl">
            CashMate adalah aplikasi pencatatan keuangan yang membantu kamu
            melacak pengeluaran dan pemasukan dengan cara mudah dan simpel.
          </p>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
