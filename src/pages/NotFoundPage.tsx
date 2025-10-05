import Footer from "../components/Layout/FooterHome";
import ButtonLink from "../components/ui/ButtonLink";

const NotFoundPage = () => {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
        <main className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-24 w-full flex-grow">
          <p className="text-7xl sm:text-9xl font-extrabold text-blue-700 mb-4 opacity-80">
            404
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl">
            Kami tidak bisa menemukan halaman yang Anda cari. Jangan khawatir,
            Anda bisa kembali ke tempat yang aman.
          </p>
          <ButtonLink
            to="/"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            🏡 Kembali ke Beranda
          </ButtonLink>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;
