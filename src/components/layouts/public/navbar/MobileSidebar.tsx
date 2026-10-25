"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { IUser } from "@/types/auth";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
  links: { label: string; href: string }[];
}

const MobileSidebar = ({ open, onClose, user, links }: MobileSidebarProps) => {
  // Menu খোলা থাকলে পেজ স্ক্রল বন্ধ + Escape চাপলে বন্ধ
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const accountHref = user?.role === "ADMIN" ? "/admin" : "/dashboard";

  const smallLink =
    "font-body text-base font-semibold text-foreground transition-opacity hover:opacity-60";

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col bg-background">
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl text-foreground"
            style={{ fontFamily: "var(--font-signature)" }}
          >
            Amina Sports
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 transition-colors hover:bg-accent"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Main links */}
        <div className="mt-5 flex flex-1 flex-col overflow-y-auto px-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="border-b border-border/40 py-3 font-semibold text-foreground transition-opacity hover:opacity-60"
              style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom links */}
        <div className="flex shrink-0 flex-col gap-4 border-t border-border px-6 pb-10 pt-6">
          {user ? (
            <Link href={accountHref} onClick={onClose} className={smallLink}>
              My Account
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={onClose} className={smallLink}>
                Sign In
              </Link>
              <Link href="/register" onClick={onClose} className={smallLink}>
                Create Account
              </Link>
            </>
          )}

          <Link href="/privacy-policy" onClick={onClose} className={smallLink}>
            Privacy Policy
          </Link>
          <Link
            href="/terms-conditions"
            onClick={onClose}
            className={smallLink}
          >
            Terms & Conditions
          </Link>
          <Link href="/return-refund" onClick={onClose} className={smallLink}>
            Return & Refund
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
