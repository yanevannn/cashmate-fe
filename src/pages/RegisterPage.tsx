import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import eye from "../assets/icons/eye.svg";
import eyeOff from "../assets/icons/eye-off.svg";

const RegisterPage = () => {
  const navigate = useNavigate();

  // State input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirm = () => setShowConfirm(!showConfirm);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validasi simple
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    const URL = import.meta.env.VITE_API_URL + "/auth/register";

    try {
      const response = await axios.post(URL, {
        email,
        username,
        password,
      });

      console.log("Registrasi berhasil:", response.data);

      // Setelah berhasil, arahkan ke halaman aktivasi
      navigate("/activate");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
          Daftar CashMate
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Email */}
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

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
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
                  <img
                    src={eye}
                    className="w-5 h-5 filter grayscale opacity-50"
                    alt="Hide password"
                  />
                ) : (
                  <img
                    src={eyeOff}
                    className="w-5 h-5 filter grayscale opacity-50"
                    alt="Show password"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
                required
              />
              <button
                type="button"
                onClick={handleToggleConfirm}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? (
                  <img
                    src={eye}
                    className="w-5 h-5 filter grayscale opacity-50"
                    alt="Hide password"
                  />
                ) : (
                  <img
                    src={eyeOff}
                    className="w-5 h-5 filter grayscale opacity-50"
                    alt="Show password"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-5 ${
              loading ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""
            }`}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Link ke Login */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
