"use client";

import React from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface AllCategoriesProps {
  isFullscreenMenuOpen: boolean;
  setIsFullscreenMenuOpen: (value: boolean) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AllCategories = ({
  isFullscreenMenuOpen,
  setIsFullscreenMenuOpen,
}: AllCategoriesProps) => {
  // Shoes/Footwear Category Data Structure
  const categories = [
    {
      name: "Men's Shoes",
      subcategories: [
        { name: "Sneakers", href: "/products?category=Men&sub=Sneakers" },
        {
          name: "Slippers & Sandals",
          href: "/products?category=Men&sub=Slippers",
        },
        { name: "Gym & Sports", href: "/products?category=Men&sub=Gym-Sports" },
        { name: "Casual Shoes", href: "/products?category=Men&sub=Casual" },
        { name: "Formal Shoes", href: "/products?category=Men&sub=Formal" },
        { name: "Boots", href: "/products?category=Men&sub=Boots" },
      ],
    },
    {
      name: "Women's Shoes",
      subcategories: [
        { name: "Sneakers", href: "/products?category=Women&sub=Sneakers" },
        {
          name: "Slippers & Flats",
          href: "/products?category=Women&sub=Slippers",
        },
        { name: "High Heels", href: "/products?category=Women&sub=High-Heels" },
        { name: "Casual Shoes", href: "/products?category=Women&sub=Casual" },
        {
          name: "Sports & Running",
          href: "/products?category=Women&sub=Sports",
        },
        { name: "Boots", href: "/products?category=Women&sub=Boots" },
      ],
    },
    {
      name: "Kids' Footwear",
      subcategories: [
        {
          name: "Boys' Sneakers",
          href: "/products?category=Kids&sub=Boys-Sneakers",
        },
        {
          name: "Girls' Sandals",
          href: "/products?category=Kids&sub=Girls-Sandals",
        },
        {
          name: "School Shoes",
          href: "/products?category=Kids&sub=School-Shoes",
        },
        { name: "Sports Shoes", href: "/products?category=Kids&sub=Sports" },
        {
          name: "Slippers & Slides",
          href: "/products?category=Kids&sub=Slippers",
        },
      ],
    },
    {
      name: "Top Brands",
      subcategories: [
        { name: "Nike", href: "/products?brand=Nike" },
        { name: "Adidas", href: "/products?brand=Adidas" },
        { name: "Puma", href: "/products?brand=Puma" },
        { name: "New Balance", href: "/products?brand=New-Balance" },
        { name: "Bata", href: "/products?brand=Bata" },
        { name: "Apex", href: "/products?brand=Apex" },
      ],
    },
  ];

  if (!isFullscreenMenuOpen) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 bg-background overflow-y-auto border-t border-border shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={() => setIsFullscreenMenuOpen(false)}
      onMouseEnter={() => setIsFullscreenMenuOpen(true)}
    >
      <div className="container mx-auto px-4 py-8 relative">
        {/* Close button */}
        <button
          onClick={() => setIsFullscreenMenuOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-[var(--color-primary-light)] rounded-full transition-colors text-[var(--color-body)] hover:text-primary"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-8 text-[var(--color-title)]">
          Shop Shoes by Category
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h3 className="text-lg font-semibold text-[var(--color-subtitle)] border-b border-border pb-2">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      onClick={() => setIsFullscreenMenuOpen(false)}
                      className="text-[var(--color-body)] hover:text-primary hover:pl-2 transition-all duration-200 block text-sm"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold mb-6 text-[var(--color-title)]">
            Featured Collections
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/products?sort=sneakers-deal"
              onClick={() => setIsFullscreenMenuOpen(false)}
              className="group"
            >
              <div className="bg-secondary p-4 rounded-xl border border-border group-hover:border-primary group-hover:shadow-md transition-all">
                <p className="font-medium text-[var(--color-title)] group-hover:text-primary transition-colors">
                  Sneaker Sale
                </p>
                <p className="text-sm text-[var(--color-body)]">
                  Up to 50% off
                </p>
              </div>
            </Link>

            <Link
              href="/products?sort=new-arrivals"
              onClick={() => setIsFullscreenMenuOpen(false)}
              className="group"
            >
              <div className="bg-secondary p-4 rounded-xl border border-border group-hover:border-primary group-hover:shadow-md transition-all">
                <p className="font-medium text-[var(--color-title)] group-hover:text-primary transition-colors">
                  New Running Shoes
                </p>
                <p className="text-sm text-[var(--color-body)]">
                  Latest arrivals
                </p>
              </div>
            </Link>

            <Link
              href="/products?category=Formal"
              onClick={() => setIsFullscreenMenuOpen(false)}
              className="group"
            >
              <div className="bg-secondary p-4 rounded-xl border border-border group-hover:border-primary group-hover:shadow-md transition-all">
                <p className="font-medium text-[var(--color-title)] group-hover:text-primary transition-colors">
                  Leather & Formal
                </p>
                <p className="text-sm text-[var(--color-body)]">Best sellers</p>
              </div>
            </Link>

            <Link
              href="/products?sort=top-brands"
              onClick={() => setIsFullscreenMenuOpen(false)}
              className="group"
            >
              <div className="bg-secondary p-4 rounded-xl border border-border group-hover:border-primary group-hover:shadow-md transition-all">
                <p className="font-medium text-[var(--color-title)] group-hover:text-primary transition-colors">
                  Premium Brands
                </p>
                <p className="text-sm text-[var(--color-body)]">
                  Nike, Adidas & more
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
