"use client";

import React, { useState } from "react";
import {
  Menu,
  User,
  Footprints,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Tag,
  ShoppingBag,
  Award,
  Lock,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types/auth";

interface UserDropdownProps {
  user: IUser | null;
}

const MobileNavbar = ({ user }: UserDropdownProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open Menu"
            className="hover:bg-[var(--color-primary-light)]"
          >
            <Menu className="h-6 w-6 text-[var(--color-title)]" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[280px] sm:w-80 p-0 overflow-y-auto bg-background border-border"
        >
          {/* Header */}
          <div className="p-4 border-b border-border bg-background sticky top-0 z-10">
            <SheetHeader className="p-0 text-left">
              <SheetTitle>
                <Link
                  href="/"
                  className="flex items-center gap-2 shrink-0"
                  onClick={closeMobileMenu}
                >
                  <span className="text-lg sm:text-xl font-light tracking-[0.18em] uppercase text-[var(--color-title)] select-none">
                    AMINA
                    <span className="font-bold tracking-[0.22em] ml-1 text-primary">
                      SPORTS
                    </span>
                  </span>
                </Link>
              </SheetTitle>
            </SheetHeader>
          </div>

          <div className="p-4 space-y-6">
            {/* USER PROFILE SECTION */}
            <div className="space-y-3">
              {user ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-primary-light"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-title)] truncate text-sm">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[var(--color-body)] truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 text-xs h-9 font-medium shadow-sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      className="w-full text-xs h-9 border-border text-foreground hover:bg-secondary"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* SHOE CATEGORIES SECTION */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-subtitle)] mb-2 px-1">
                Shoe Categories
              </h3>
              <div className="space-y-1">
                {[
                  {
                    name: "Men's Shoes",
                    href: "/products?category=Men",
                    icon: Footprints,
                  },
                  {
                    name: "Women's Shoes",
                    href: "/products?category=Women",
                    icon: Footprints,
                  },
                  {
                    name: "Sneakers & Casual",
                    href: "/products?sub=Sneakers",
                    icon: ShoppingBag,
                  },
                  {
                    name: "Kids' Footwear",
                    href: "/products?category=Kids",
                    icon: Sparkles,
                  },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-body)] hover:bg-[var(--color-primary-light)] hover:text-primary transition-colors text-sm font-medium"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* EXTRA LINKS */}
            <div className="pt-4 border-t border-border space-y-2">
              <Link
                href="/privacy-policy"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-1 py-1.5 text-xs text-[var(--color-body)] hover:text-primary transition-colors"
              >
                <Lock className="h-4 w-4 text-warning" />
                <span>Privacy Policy</span>
              </Link>

              <Link
                href="/terms-conditions"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-1 py-1.5 text-xs text-[var(--color-body)] hover:text-primary transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-success" />
                <span>Terms & Conditions</span>
              </Link>

              <Link
                href="/return-refund"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-1 py-1.5 text-xs text-[var(--color-body)] hover:text-primary transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-info" />
                <span>Return & Refund</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
