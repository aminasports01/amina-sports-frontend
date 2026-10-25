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
    <header className="bg-card text-card-foreground border-b border-border sticky top-0 z-20">
      <div className="pl-3 pr-5 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu Button & Logo */}
          <div className="flex items-center ">
            {/* Menu Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} className="text-muted-foreground" />
            </button>

            {/* Mobile Logo */}
            <div className="md:hidden">
              <Link href="/admin" className="flex items-center ">
                <Image
                  src="/images/sera-place-logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="dark:invert"
                />
              </Link>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
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
                className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-accent rounded-lg"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="user"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium text-secondary-foreground">
                      {getInitial()}
                    </span>
                  )}
                </div>

                <ChevronDown size={14} className="text-muted-foreground" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className="absolute right-0 mt-2 w-56 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-title">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <User size={15} />
                        Profile
                      </Link>
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handelLogout}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-destructive w-full hover:bg-accent"
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
