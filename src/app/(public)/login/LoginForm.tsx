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

  return (
    <div className="flex md:min-h-screen items-center justify-center bg-background p-4">
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-all duration-300">
          {/* Brand Header */}
          <div className="bg-button px-8 py-6">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-button-text" />

              <h2 className="text-center text-2xl font-bold text-button-text">
                Welcome Back
              </h2>

              <Sparkles className="h-6 w-6 text-button-text" />
            </div>

            <p className="text-center text-sm text-button-text/90">
              Sign in to your account
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-4 rounded-xl border border-border bg-secondary p-3">
                <p className="text-center text-sm text-title font-medium">
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
                  className="mb-2 block text-sm font-medium text-title"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
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
                    className="w-full rounded-xl border border-input bg-secondary py-3 pr-4 pl-10 text-foreground transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-medium text-title"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
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
                    className="w-full rounded-xl border border-input bg-secondary py-3 pr-12 pl-10 text-foreground transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-button py-3 font-semibold text-button-text shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-button-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-button-text border-t-transparent" />
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
                <div className="w-full border-t border-border" />
              </div>

              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Or login with credentials
                </span>
              </div>
            </div>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-body">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-link transition-colors hover:text-link-hover hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Secure login with 256-bit encryption
        </p>
      </div>
    </div>
  );
}
