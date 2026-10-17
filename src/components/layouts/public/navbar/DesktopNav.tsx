"use client";
import React, { useState, useRef } from "react";
import AllCategories from "./AllCategories";
import Link from "next/link";

const navLinks = [
  { label: "NEW ARRIVALS", href: "/products?sort=newest" },
  { label: "MEN'S SHOES", href: "/products?category=Men" },
  { label: "WOMEN'S SHOES", href: "/products?category=Women" },
  { label: "KIDS' FOOTWEAR", href: "/products?category=Kids" },
  { label: "SNEAKERS", href: "/products?sub=Sneakers" },
  { label: "GYM & SPORTS", href: "/products?sub=Gym-Sports" },
  { label: "BRANDS", href: "/products?sort=top-brands" },
  { label: "SALE", href: "/products?sort=deals" },
];

const DesktopNav = () => {
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsFullscreenMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFullscreenMenuOpen(false);
    }, 200);
  };

  return (
    // static / relative wrapper on outer navigation bar
    <div
      className="hidden lg:flex items-center justify-center gap-8 py-3 text-xs tracking-wider font-semibold text-[var(--color-title)] uppercase"
      onMouseLeave={handleMouseLeave}
    >
      <div onMouseEnter={handleMouseEnter} className="py-1">
        <div className="cursor-pointer hover:text-primary transition-colors">
          All Categories
        </div>
      </div>

      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary transition-colors py-1"
        >
          {link.label}
        </Link>
      ))}

      {/* Render AllCategories outside relative wrapper so it takes full screen width */}
      {isFullscreenMenuOpen && (
        <AllCategories
          isFullscreenMenuOpen={isFullscreenMenuOpen}
          setIsFullscreenMenuOpen={setIsFullscreenMenuOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default DesktopNav;
