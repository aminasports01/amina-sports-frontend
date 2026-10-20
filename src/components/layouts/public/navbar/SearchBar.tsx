"use client";

import { Input } from "@/components/ui/input";
import { Search, Star, X, Clock, Package, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "@/services/product.service";
import { IProduct } from "@/types/products.type";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const popularSearches = ["Air Force 1 Low", "Air Jordan 1 Low"];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        return;
      }
      try {
        setLoading(true);
        const data = await getProducts({
          search: searchQuery,
          limit: 10,
        });
        setProducts(data?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    setIsOpen(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full relative" ref={searchRef}>
      <div className="relative flex w-full items-center">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="w-full h-11 bg-gray-100 border-none rounded-md pl-4 pr-20 text-sm focus-visible:ring-1 focus-visible:ring-gray-300"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleSearchSubmit}
            className="text-gray-600 hover:text-black"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {!searchQuery && !loading && products.length === 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Popular Searches
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(term);
                      setIsOpen(true);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-800 border-t-transparent"></div>
              <p className="text-sm text-gray-500 mt-2">
                Searching products...
              </p>
            </div>
          )}

          {!loading && searchQuery && products.length === 0 && (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No products found</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div
                    onClick={() => {
                      setProducts([]);
                      setSearchQuery("");
                      setIsOpen(false);
                    }}
                    className="group p-3 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {product.thumbnail && (
                          <Image
                            src={product.thumbnail}
                            fill
                            alt={product.name}
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm text-gray-800 line-clamp-1">
                            {product.name}
                          </p>
                          <span className="font-semibold text-sm text-gray-900">
                            ৳{product.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-gray-600">
                                {product.rating}
                              </span>
                            </div>
                          )}
                          {product.stock && product.stock > 0 ? (
                            <span className="text-xs text-green-600">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-xs text-red-500">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleSearchSubmit}
                className="w-full flex items-center justify-center gap-2 text-gray-800 font-semibold text-sm"
              >
                View all results
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
