"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { logout } from "@/utils/auth";
import { IUser } from "@/types/auth";

interface UserDropdownProps {
  user: IUser;
}

const getInitials = (name?: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const itemClass =
  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";
  const profileHref = isAdmin ? "/admin/profile" : "/dashboard/profile";
  const dashboardHref = isAdmin ? "/admin" : "/dashboard";
  const initials = getInitials(user?.name);

  // বাইরে ক্লিক করলে বা Escape চাপলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button  */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center rounded-md p-1.5 transition-colors duration-200 hover:bg-accent"
        aria-label="User menu"
        aria-expanded={open}
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="User avatar"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border border-border object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
            {initials || <User size={14} />}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User info */}
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-semibold text-title">
              {user?.name || "User"}
            </p>
            {user?.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link
              href={profileHref}
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <User size={16} className="text-muted-foreground" />
              Profile
            </Link>

            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <LayoutDashboard size={16} className="text-muted-foreground" />
              {isAdmin ? "Admin Panel" : "Dashboard"}
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-border p-1.5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
