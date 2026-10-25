"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Search, X } from "lucide-react";
import { getProducts } from "@/services/product.service";
import { IProduct } from "@/types/products.type";

const popularSearches = ["Air Force 1 Low", "Air Jordan 1 Low"];

const suggestions = [
  {
    label: "Men's Shoes",
    description: "Sneakers, Casual, Sports",
    href: "/products?category=Men",
  },
  {
    label: "Women's Shoes",
    description: "Sneakers, Casual, Sports",
    href: "/products?category=Women",
  },
];

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const query = searchInput.trim();

  // Escape চাপলে বন্ধ + খোলা থাকলে পেজ স্ক্রল বন্ধ
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // টাইপ থামার ৩০০ms পর সার্চ করে
  useEffect(() => {
    if (!query) return;

    let cancelled = false;

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getProducts({ search: query, limit: 8 });
        if (!cancelled) setProducts(res?.data?.data || []);
      } catch (error) {
        console.error("Search failed:", error);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleSearchAll = () => {
    if (query) handleNavigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const results = query ? products : [];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      {/* ── TOP BAR */}
      <div className="w-full shrink-0 px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-accent px-4 ring-1 ring-transparent transition-all duration-200 focus-within:ring-foreground">
            <Search
              size={18}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground"
            />
            <input
              autoFocus
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchAll()}
              placeholder="Search Amina Sports..."
              className="flex-1 border-none bg-transparent font-body text-base text-foreground outline-none ring-0 placeholder:text-muted-foreground"
            />
            {searchInput.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                aria-label="Clear search"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted-foreground/40 transition-colors hover:bg-muted-foreground/60"
              >
                <X size={11} strokeWidth={2.5} className="text-background" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 font-body text-base text-foreground transition-opacity hover:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="h-px w-full shrink-0 bg-border" />

      {/* ── CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 pb-8">
          {query ? (
            loading ? (
              /* Loading skeleton */
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <div className="aspect-[3/4] w-20 shrink-0 animate-pulse rounded-lg bg-accent sm:w-28" />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="h-3 w-1/4 animate-pulse rounded bg-accent" />
                      <div className="h-3 w-3/4 animate-pulse rounded bg-accent" />
                      <div className="h-3 w-1/3 animate-pulse rounded bg-accent" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              /* No results */
              <div className="flex flex-col items-center justify-center gap-3 pt-20">
                <Search
                  size={32}
                  strokeWidth={1.25}
                  className="text-muted-foreground"
                />
                <p className="font-body text-base text-muted-foreground">
                  No results for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="flex items-center justify-between pb-3 pt-5">
                  <p className="font-body text-base font-semibold text-foreground">
                    Results
                  </p>
                  <p className="font-body text-base text-muted-foreground">
                    {results.length} found
                  </p>
                </div>

                {/* Results grid */}
                <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {results.map((product) => {
                    const hasDiscount =
                      !!product.specialPrice &&
                      product.specialPrice > 0 &&
                      product.specialPrice < product.price;
                    const unitPrice = hasDiscount
                      ? product.specialPrice!
                      : product.price;

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() =>
                          handleNavigate(`/products/${product.slug}`)
                        }
                        className="flex w-full items-start gap-4 border-b border-border/50 py-4 text-left transition-opacity hover:opacity-60"
                      >
                        <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                          {product.thumbnail && (
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              fill
                              sizes="112px"
                              className="object-cover object-center"
                            />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
                          {product.brand && (
                            <p className="font-body text-sm text-muted-foreground">
                              {product.brand}
                            </p>
                          )}
                          <p className="line-clamp-2 font-body text-base font-semibold leading-snug text-foreground">
                            {product.name}
                          </p>

                          <div className="mt-1 flex items-center gap-2 font-price">
                            <span className="text-base font-semibold text-foreground">
                              ৳{unitPrice.toLocaleString()}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm text-muted-foreground line-through">
                                ৳{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {product.stock <= 0 && (
                            <p className="font-body text-sm text-destructive">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* See all */}
                <button
                  type="button"
                  onClick={handleSearchAll}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-foreground py-3.5 font-body text-base font-semibold text-background transition-opacity hover:opacity-80"
                >
                  See all results for &quot;{query}&quot;
                  <ArrowUpRight size={16} strokeWidth={2} />
                </button>
              </>
            )
          ) : (
            <>
              {/* Popular searches */}
              <p className="border-b border-border pb-3 pt-6 font-body text-base font-bold text-foreground">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 py-4">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchInput(term)}
                    className="rounded-full bg-accent px-4 py-1.5 font-body text-sm text-foreground transition-colors hover:bg-border"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Category suggestions */}
              <p className="border-b border-border pb-3 pt-4 font-body text-base font-bold text-foreground">
                Shop By
              </p>
              {suggestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="group flex w-full items-center justify-between border-b border-border/50 py-3.5 transition-opacity hover:opacity-60"
                >
                  <div className="text-left">
                    <p className="font-body text-base font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.75}
                    className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
