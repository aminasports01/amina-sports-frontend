"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Circle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";
import Image from "next/image";
import { IUser } from "@/types/auth";

interface UserDropdownProps {
  user: IUser;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ROLE BASED PROFILE REDIRECT
  const handleProfile = () => {
    setOpen(false);
    if (user?.role === "ADMIN") {
      router.push("/admin/profile");
    } else {
      router.push("/dashboard/profile");
    }
  };

  // ROLE BASED DASHBOARD REDIRECT
  const handleDashboard = () => {
    setOpen(false);
    if (user?.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push("/login");
  };

  // Global Theme matching role badge colors
  const getRoleBadgeStyle = () => {
    return user?.role === "ADMIN"
      ? "text-primary bg-[var(--color-primary-light)] border border-primary/20"
      : "text-[var(--color-subtitle)] bg-secondary border border-border";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* USER BUTTON WITH AVATAR + CHEVRON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 sm:gap-2 p-1 sm:px-2 sm:py-1.5 rounded-full hover:bg-[var(--color-primary-light)] transition-all duration-200"
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="flex items-center justify-center shrink-0">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="user avatar"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-border ring-2 ring-[var(--color-primary-light)]"
            />
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
              {user?.name ? (
                <span className="text-xs sm:text-sm font-semibold text-primary-foreground">
                  {getInitials(user.name)}
                </span>
              ) : (
                <User className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
          )}
        </div>

        {/* Chevron indicator */}
        <ChevronDown
          className={`hidden md:block w-4 h-4 text-[var(--color-body)] transition-transform duration-200 ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* USER INFO HEADER */}
          <div className="p-4 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="user avatar"
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover border border-border ring-2 ring-[var(--color-primary-light)]"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
                  {user?.name ? (
                    <span className="text-sm font-bold text-primary-foreground">
                      {getInitials(user.name)}
                    </span>
                  ) : (
                    <User className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-bold text-[var(--color-title)] truncate text-sm">
                  {user?.name || "User"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${getRoleBadgeStyle()}`}
                  >
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className="p-1.5 space-y-0.5">
            {/* Profile */}
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-[var(--color-primary-light)] hover:text-primary transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <User className="w-4 h-4 text-[var(--color-body)] group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-xs sm:text-sm">Profile</p>
                <p className="text-[11px] text-[var(--color-body)]">
                  View and edit your profile
                </p>
              </div>
            </button>

            {/* Dashboard */}
            <button
              onClick={handleDashboard}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-[var(--color-primary-light)] hover:text-primary transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <LayoutDashboard className="w-4 h-4 text-[var(--color-body)] group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-xs sm:text-sm">Dashboard</p>
                <p className="text-[11px] text-[var(--color-body)]">
                  {user?.role === "ADMIN"
                    ? "Admin control panel"
                    : "Your activity overview"}
                </p>
              </div>
            </button>

            {/* Divider */}
            <div className="my-1 border-t border-border" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                <LogOut className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-xs sm:text-sm">Logout</p>
                <p className="text-[11px] text-destructive/80">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
