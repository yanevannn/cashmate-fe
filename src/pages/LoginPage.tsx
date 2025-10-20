import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { doLogin } from "../api/apiAuth";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

type LoginFormSchema = {
  email: string;
  password: string;
};

type UserInfo = {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormSchema>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (values: LoginFormSchema) => {
    setLoading(true);
    try {
      const response = await doLogin(values);
      const acces_token = response.data.data.access_token;
      const refresh_token = response.data.data.refresh_token;
      const userData = jwtDecode<UserInfo>(acces_token);

      localStorage.setItem("access_token", acces_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user_info", JSON.stringify(userData));

      navigate("/dashboard");
      setLoading(false);
      toast.success("Login berhasil!", { duration: 3000 });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          toast.error("Email atau password salah. Silakan coba lagi.");
        } else if (error.status === 400) {
          const backendValidationErrors = error.response?.data.errors;
          Object.entries(backendValidationErrors).forEach(
            ([field, messages]) => {
              toast.error(`${field} ${messages}`, { duration: 4000 });
            }
          );
        } else {
          console.error(error);
        }
      } else {
        toast.error("Terjadi kesalahan pada sistem. Silakan coba lagi nanti.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      localStorage.setItem("login_redirect", "true");
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
            Login to CashMate
          </h1>

          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleLoginSubmit)}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...form.register("email")}
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
                  {...form.register("password")}
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
