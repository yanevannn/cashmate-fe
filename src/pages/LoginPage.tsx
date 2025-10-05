import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  name?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

const LoginPage = () => {
  // Initial Navigate
  const navigate = useNavigate();

  // Use Effect untuk cek token di localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // State untuk menampilkan atau menyembunyikan password
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // State untuk menyimpan data form (email dan password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk Loading dan error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fungsi untuk menangani submit form
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const URL = import.meta.env.VITE_API_URL + "/auth/login";

    try {
      const response = await axios.post(URL, { email, password });
      // console.log("Login berhasil:", response.data);

      // Simpan token ke localStorage
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);

      const decoded: DecodedToken = jwtDecode(response.data.data.access_token);
      localStorage.setItem("user_info", JSON.stringify(decoded));

      // Redirect ke halaman dashboard atau halaman lain setelah login berhasil
      navigate("/dashboard");
    } catch (err: any) {
      const status = err.response?.status;
      const message =
        err.response?.data?.message ||
        "Login gagal. Silakan periksa email dan password Anda.";

      if (status === 401 && message.toLowerCase().includes("not activated")) {
        localStorage.setItem("pending_email", email);
        navigate("/activate");

        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Judul */}
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center mb-5">
            Login to CashMate
          </h1>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5 filter grayscale opacity-50" />
                  ) : (
                    <EyeOff className="w-5 h-5 filter grayscale opacity-50" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-5 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                  : ""
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Link ke register */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register di sini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
