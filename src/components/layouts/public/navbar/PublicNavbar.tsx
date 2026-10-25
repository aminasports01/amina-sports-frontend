"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { getUser } from "@/utils/auth";
import { IUser } from "@/types/auth";
import UserDropdown from "./UserDropdown";
import MobileSidebar from "./MobileSidebar";
import SearchModal from "./SearchModal";

const navLinks = [
  { label: "Men's Shoes", href: "/products?category=Men" },
  { label: "Women's Shoes", href: "/products?category=Women" },
];

/* ---------- client-only helpers  ---------- */
const emptySubscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function useCurrentUser(): IUser | null {
  // string snapshot,
  const raw = useSyncExternalStore(
    emptySubscribe,
    () => JSON.stringify(getUser() ?? null),
    () => "null",
  );
  return useMemo(() => JSON.parse(raw) as IUser | null, [raw]);
}

const PublicNavbar = ({ className }: { className?: string }) => {
  const isHydrated = useIsHydrated();
  const user = useCurrentUser();

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // নিচে স্ক্রল করলে navbar লুকায়, উপরে স্ক্রল করলে দেখায়
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 10) setVisible(true);
      else if (y > lastY.current) setVisible(false);
      else setVisible(true);
      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm",
          "transition-transform duration-300 ease-in-out",
          visible ? "translate-y-0" : "-translate-y-full",
          className,
        )}
      >
        <div className="mx-auto w-full max-w-[1900px] px-4">
          <div className="relative flex h-14 items-center">
            {/* ── LEFT — Hamburger + Logo */}
            <div className="flex flex-1 items-center gap-2">
              <button
                type="button"
                className="rounded-md p-1 transition-colors hover:bg-accent md:hidden"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={22} strokeWidth={2} />
              </button>

              <Link
                href="/"
                className="whitespace-nowrap text-2xl text-foreground sm:text-3xl"
                style={{ fontFamily: "var(--font-signature)" }}
              >
                Amina Sports
              </Link>
            </div>

            {/* ── CENTRE — Nav links (desktop) */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative py-1 font-body text-base font-semibold text-foreground transition-opacity duration-200 hover:opacity-60"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* ── RIGHT — Icons */}
            <div className="flex flex-1 items-center justify-end gap-0.5">
              {/* Search — desktop */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="mr-2 hidden h-8 w-36 items-center gap-2 rounded-lg border bg-accent px-3 text-muted-foreground transition-colors duration-200 hover:bg-accent/80 lg:flex"
                aria-label="Open search"
              >
                <Search
                  size={18}
                  strokeWidth={1.75}
                  className="text-foreground"
                />
                <span className="font-body text-sm font-semibold text-foreground">
                  Search...
                </span>
              </button>

              {/* Search — mobile / tablet */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-md p-1.5 transition-colors duration-200 hover:bg-accent lg:hidden"
                aria-label="Search"
              >
                <Search size={22} strokeWidth={2} />
              </button>

              {/* Account */}
              {user ? (
                <UserDropdown user={user} />
              ) : (
                <Link
                  href="/login"
                  className="rounded-md p-1.5 transition-colors duration-200 hover:bg-accent"
                  aria-label="Account"
                >
                  <User size={22} strokeWidth={2} />
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-md p-1.5 transition-colors duration-200 hover:bg-accent"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={22} strokeWidth={2} />
                {isHydrated && cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold leading-none text-background">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (full screen) */}
      <MobileSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        links={navLinks}
      />

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export { PublicNavbar };
