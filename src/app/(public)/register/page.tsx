/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordStrength(Math.min(strength, 4));
  };

  const getPasswordStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength];
  };

  const getPasswordStrengthColor = () => {
    // Keep semantic colors for password-strength feedback.
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    return colors[passwordStrength];
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await registerUser(payload);

      toast.success("Account created successfully! Please login.", {
        duration: 3000,
        icon: <CheckCircle className="h-4 w-4" />,
      });

      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7fafa] via-[#eef5f5] to-[#e4eeee] p-4 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Brand-colored Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-[#a7d0d2] opacity-30 blur-3xl dark:bg-[#02333a] dark:opacity-40" />

        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-[#b5d9da] opacity-30 blur-3xl dark:bg-[#03434b] dark:opacity-30" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          {/* Brand Header */}
          <div className="bg-gradient-to-r from-[#02333a] to-[#07525b] px-8 py-6 dark:from-[#02333a] dark:to-[#06434b]">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-white" />

              <h2 className="text-center text-2xl font-bold text-white">
                Create Account
              </h2>

              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <p className="text-center text-sm text-white/90">
              Join us and start your journey
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#02333a] dark:group-focus-within:text-teal-400"
                    size={18}
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                    placeholder="John Doe"
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
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
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                    placeholder="hello@example.com"
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
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
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            index < passwordStrength
                              ? getPasswordStrengthColor()
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Password strength:{" "}
                      <span className="font-medium">
                        {getPasswordStrengthText()}
                      </span>
                    </p>

                    {passwordStrength < 3 && formData.password.length > 0 && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Tip: Use a mix of letters, numbers & symbols
                      </p>
                    )}
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#02333a] dark:group-focus-within:text-teal-400"
                    size={18}
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-10 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-[#02333a] focus:ring-2 focus:ring-[#02333a]/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-teal-500 dark:focus:ring-teal-500/20"
                    placeholder="Confirm your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#02333a] dark:hover:text-teal-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#02333a] to-[#07525b] py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-[#011f23] hover:to-[#034149] focus-visible:ring-2 focus-visible:ring-[#02333a] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#02333a] transition-colors hover:text-[#011f23] hover:underline dark:text-teal-400 dark:hover:text-teal-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
