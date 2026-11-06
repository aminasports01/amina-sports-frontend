"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Menu, Moon, Sun, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { getUser, logout } from "@/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ---------------- THEME STORE (localStorage + .dark class) ---------------- */
const THEME_KEY = "admin-theme";
const themeListeners = new Set<() => void>();

const subscribeTheme = (callback: () => void) => {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
};

const getThemeSnapshot = () => {
  try {
    return localStorage.getItem(THEME_KEY) === "dark";
  } catch {
    return false;
  }
};

const getThemeServerSnapshot = () => false;

const setTheme = (dark: boolean) => {
  try {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  } catch {}
  themeListeners.forEach((listener) => listener());
};

/* ---------------- USER (client-only, no setState in effect) ---------------- */
type User = ReturnType<typeof getUser>;

const subscribeNoop = () => () => {};

const useCurrentUser = (): User | null => {
  // string snapshot রাখা হয়েছে যাতে snapshot stable থাকে (infinite loop না হয়)
  const raw = useSyncExternalStore(
    subscribeNoop,
    () => JSON.stringify(getUser() ?? null),
    () => "null",
  );

  return useMemo(() => JSON.parse(raw) as User | null, [raw]);
};

const AdminHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useCurrentUser();
  const router = useRouter();

  const isDarkMode = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => setTheme(!isDarkMode);

  const handelLogout = () => {
    logout();
    router.push("/login");
  };

  const getInitial = () => {
    if (!user) return "U";
    return (user?.name || user?.email || "U").charAt(0).toUpperCase();
  };

  return (
    // মোবাইলে bg-background (স্ক্রলের সময় নিচের লেখা না দেখা যাওয়ার জন্য), ডেস্কটপ আগের মতো
    <header className="sticky top-0 z-20 border-b border-border bg-background text-card-foreground md:bg-transparent">
      <div className="py-2 pl-2 pr-3 md:py-3 md:pl-3 md:pr-5">
        <div className="flex items-center justify-between gap-2">
          {/* Left Side - Menu Button & Logo */}
          <div className="flex min-w-0 items-center gap-1">
            {/* Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="shrink-0 rounded-lg p-2 transition-colors hover:bg-accent"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} className="text-muted-foreground" />
            </button>

            {/* Mobile Logo (text) */}
            <div className="min-w-0 md:hidden">
              <Link href="/admin" className="flex items-center">
                <span
                  className="truncate whitespace-nowrap text-2xl leading-none text-foreground"
                  style={{ fontFamily: "var(--font-signature)" }}
                >
                  Amina Sports
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-2 transition-colors hover:bg-accent"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-muted-foreground" />
              ) : (
                <Moon size={18} className="text-muted-foreground" />
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 rounded-lg py-1 pl-1 pr-1 hover:bg-accent sm:gap-2 sm:pl-2"
                aria-label="User menu"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-secondary">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="user"
                      width={32}
                      height={32}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-secondary-foreground">
                      {getInitial()}
                    </span>
                  )}
                </div>

                <ChevronDown
                  size={14}
                  className="hidden text-muted-foreground sm:block"
                />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className="absolute right-0 z-20 mt-2 w-56 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg">
                    <div className="border-b border-border p-3">
                      <p className="truncate text-sm font-medium text-title">
                        {user?.name || "User"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/admin/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <User size={15} />
                        Profile
                      </Link>
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handelLogout}
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-accent"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
