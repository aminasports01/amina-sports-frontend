"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/store/cart.store";
import { getUser } from "@/utils/auth";
import UserDropdown from "./UserDropdown";
import DesktopNav from "./DesktopNav";
import MobileSidebar from "./MobileSidebar";
import { IUser } from "@/types/auth";

const emptySubscribe = () => () => {};
function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const PublicNavbar = ({ className }: { className?: string }) => {
  const isHydrated = useIsHydrated();
  const [user, setUser] = useState<IUser | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      queueMicrotask(() => {
        setUser(currentUser);
      });
    }
  }, []);

  return (
    <section
      className={cn(
        "border-b border-border bg-background sticky top-0 z-50 w-full transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* LEFT: Mobile Sidebar & Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <MobileSidebar user={user} />

            {/* Minimalist Text Logo matching Theme Title Color */}
            <Link href="/" className="flex items-center">
              <span className="text-base sm:text-lg md:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[var(--color-title)] select-none whitespace-nowrap">
                AMINA
                <span className="font-bold tracking-[0.18em] sm:tracking-[0.25em] ml-1.5 sm:ml-2 text-primary">
                  SPORTS
                </span>
              </span>
            </Link>
          </div>

          {/* CENTER: Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <SearchBar />
          </div>

          {/* RIGHT: User & Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* User Dropdown / Login */}
            {user ? (
              <UserDropdown user={user} />
            ) : (
              <Link
                href="/login"
                className="text-[var(--color-body)] hover:text-[var(--color-title)] transition-colors"
                aria-label="Account"
              >
                <div className="p-1.5 hover:bg-[var(--color-primary-light)] rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </Link>
            )}

            {/* Cart Icon */}
            <div className="relative">
              <Link
                href="/cart"
                className="text-[var(--color-body)] hover:text-[var(--color-title)] transition-colors block p-1.5 hover:bg-[var(--color-primary-light)] rounded-full"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {isHydrated && cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-4 min-w-4 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground px-1 text-[10px] sm:text-[11px] font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="mt-2.5 block md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* DESKTOP LOWER NAV */}
      <div className="border-t border-border hidden lg:block bg-background">
        <div className="container mx-auto px-4">
          <DesktopNav />
        </div>
      </div>
    </section>
  );
};

export { PublicNavbar };
