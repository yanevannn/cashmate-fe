import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const ActivatePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Ambil email dari localStorage (kalau tidak ada → redirect ke login)
  useEffect(() => {
    const savedEmail = localStorage.getItem("pending_email");

    if (!savedEmail && !success) {
      navigate("/login"); // redirect otomatis
      return;
    }

    if (savedEmail) setEmail(savedEmail);
  }, [navigate]);

  // Handle perubahan input kode angka
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // hanya angka

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto fokus ke input selanjutnya
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit aktivasi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const activationCode = code.join("");

    if (activationCode.length < 6) {
      setError("Kode aktivasi harus 6 angka.");
      return;
    }

    setLoading(true);
    setError("");

    const URL = import.meta.env.VITE_API_URL + "/auth/activate";

    try {
      const response = await axios.post(URL, {
        email,
        code: activationCode,
      });

      console.log("Aktivasi berhasil:", response.data);

      // Bersihkan localStorage
      localStorage.removeItem("pending_email");

      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Aktivasi gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendActivation = async () => {
    if (!email || resending || countdown > 0) return;
    setResending(true);
    setError("");

    const URL_RESEND = import.meta.env.VITE_API_URL + "/auth/resend-activation";

    try {
      const response = await axios.post(URL_RESEND, { email });
      console.log("Pengiriman ulang kode berhasil:", response.data);
      setCountdown(60);
    } catch (error) {
      setError(error.response?.data?.message || "Gagal mengirim ulang kode.");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
          Aktivasi Akun CashMate
        </h1>

        {success ? (
          <div className="space-y-6 flex flex-col items-center">
            <p className="text-green-600 font-medium text-lg">
              🎉 Aktivasi akun Anda berhasil!
            </p>
            <p className="text-gray-700 text-center">
              Anda sekarang bisa login ke akun CashMate Anda.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login Sekarang
            </Link>
          </div>
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Informasi email */}
              <p className="text-sm text-gray-700 text-center mb-4">
                Kode aktivasi telah dikirim ke email Anda{" "}
                <span className="font-semibold text-blue-700">{email}</span>.
                <br />
                Silakan cek inbox atau folder spam untuk mendapatkan kode
                aktivasi.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Masukkan Kode Aktivasi
                </label>

                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-10 h-12 text-center border rounded-lg text-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                    : ""
                }`}
              >
                {loading ? "Memproses..." : "Aktivasi Akun"}
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-6">
              Tidak menerima kode?{" "}
              <button
                onClick={handleResendActivation}
                disabled={resending || countdown > 0}
                className={`font-semibold hover:underline ${
                  resending || countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600"
                }`}
              >
                {resending
                  ? "Mengirim ulang..."
                  : countdown > 0
                  ? `Kirim ulang (${countdown}s)`
                  : "Kirim ulang"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivatePage;
