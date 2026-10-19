"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/auth.service";
import { setAuthData } from "@/utils/auth";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser(data);
      setAuthData(res.data.accessToken, res.data.user);

      const role = res.data.user.role;

      if (role === "ADMIN" || role === "SUPER_ADMIN") {
        router.push("/admin");
      } else if (role === "SELLER") {
        router.push("/seller");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  // const loginAsAdmin = async () => {
  //   const data = {
  //     email: "admin@gmail.com",
  //     password: "12345678",
  //   };

  //   setFormData(data);
  //   await handleLogin(data);
  // };

  // const loginAsCustomer = async () => {
  //   const data = {
  //     email: "customer@gmail.com",
  //     password: "12345678",
  //   };

  //   setFormData(data);
  //   await handleLogin(data);
  // };

  return (
    <div className="flex md:min-h-screen items-center justify-center bg-gradient-to-br from-[#f7fafa] via-[#eef5f5] to-[#e4eeee] p-4 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          {/* Brand Header */}
          <div className="bg-gradient-to-r from-[#02333a] to-[#07525b] px-8 py-6">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-white" />

              <h2 className="text-center text-2xl font-bold text-white">
                Welcome Back
              </h2>

              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <p className="text-center text-sm text-white/90">
              Sign in to your account
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                <p className="text-center text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#02333a] dark:group-focus-within:text-teal-400"
                    size={18}
                  />

                  <input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#02333a] dark:group-focus-within:text-teal-400"
                    size={18}
                  />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#02333a] dark:hover:text-teal-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#02333a] to-[#07525b] py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-[#011f23] hover:to-[#034149] focus-visible:ring-2 focus-visible:ring-[#02333a] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative mb-6 mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>

              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or login with credentials
                </span>
              </div>
            </div>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#02333a] transition-colors hover:text-[#011f23] hover:underline dark:text-teal-400 dark:hover:text-teal-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Secure login with 256-bit encryption
        </p>
      </div>
    </div>
  );
}
