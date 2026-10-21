/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlidersHorizontal, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProductCard1 } from "@/components/product-card1";

import { SheetClose } from "@/components/ui/sheet";
import { getProducts } from "@/services/product.service";
import { IProduct } from "@/types/products.type";
import { MobileFilter } from "@/components/layouts/public/product/MobileFilter";

type SearchParams = Promise<{
  page?: string;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  rating?: string;
}>;

type Sp = Record<string, string | undefined>;

/* ================= FILTER CONFIG ================= */

const PARAM_KEYS = [
  "search",
  "categoryId",
  "brand",
  "rating",
  "minPrice",
  "maxPrice",
  "sortBy",
  "sortOrder",
] as const;

type FilterOption = { label: string; params: Record<string, string> };
type FilterGroup = { title: string; keys: string[]; options: FilterOption[] };

function getFilterGroups(): FilterGroup[] {
  return [
    {
      title: "Price",
      keys: ["minPrice", "maxPrice"],
      options: [
        { label: "Under $50", params: { maxPrice: "50" } },
        { label: "$50 - $100", params: { minPrice: "50", maxPrice: "100" } },
        { label: "$100 - $200", params: { minPrice: "100", maxPrice: "200" } },
        { label: "$200+", params: { minPrice: "200" } },
      ],
    },
    {
      title: "Sort By",
      keys: ["sortBy", "sortOrder"],
      options: [
        {
          label: "Latest",
          params: { sortBy: "createdAt", sortOrder: "desc" },
        },
        {
          label: "Price Low to High",
          params: { sortBy: "price", sortOrder: "asc" },
        },
        {
          label: "Price High to Low",
          params: { sortBy: "price", sortOrder: "desc" },
        },
        { label: "Top Rated", params: { sortBy: "rating", sortOrder: "desc" } },
      ],
    },
  ];
}

function buildHref(sp: Sp, group: FilterGroup, option: FilterOption) {
  const q = new URLSearchParams();
  for (const key of PARAM_KEYS) {
    const value = sp[key];
    if (value && !group.keys.includes(key)) q.set(key, value);
  }
  for (const [k, v] of Object.entries(option.params)) q.set(k, v);
  return `?${q.toString()}`;
}

function isActive(sp: Sp, group: FilterGroup, option: FilterOption) {
  return group.keys.every(
    (k) => (sp[k] || undefined) === (option.params[k] || undefined),
  );
}

function pageHref(sp: Sp, page: number) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (v !== undefined && v !== "" && k !== "page") q.set(k, v);
  }
  q.set("page", String(page));
  return `?${q.toString()}`;
}

/* ================= SHARED UI PIECES ================= */

function SearchForm({
  sp,
  variant,
}: {
  sp: Sp;
  variant: "desktop" | "mobile";
}) {
  return (
    <form method="get" className={variant === "desktop" ? "mb-5" : "mb-6"}>
      {PARAM_KEYS.filter((k) => k !== "search" && sp[k]).map((k) => (
        <input key={k} type="hidden" name={k} value={sp[k] || ""} />
      ))}

      {variant === "mobile" && (
        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
          Search
        </h3>
      )}

      <input
        type="search"
        name="search"
        placeholder="Search product..."
        defaultValue={sp?.search || ""}
        className={
          variant === "desktop"
            ? "w-full border border-input bg-background text-foreground p-2 rounded-xs text-sm outline-none focus:ring-1 focus:ring-ring"
            : "w-full border border-input bg-background text-foreground outline-none p-3 rounded-xs text-sm focus:ring-1 focus:ring-ring"
        }
      />
    </form>
  );
}

function FilterGroups({
  groups,
  sp,
  variant,
}: {
  groups: FilterGroup[];
  sp: Sp;
  variant: "desktop" | "mobile";
}) {
  return (
    <>
      {groups.map((group) => (
        <div
          key={group.title}
          className={
            variant === "desktop"
              ? "mb-5 border-b pb-4 last:mb-0 last:border-b-0 last:pb-0"
              : "mb-6 border-b pb-6 last:mb-0 last:border-b-0 last:pb-0"
          }
        >
          <h3
            className={
              variant === "desktop"
                ? "font-semibold mb-2 text-title"
                : "font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground"
            }
          >
            {group.title}
          </h3>

          <div className="space-y-2 text-sm">
            {group.options.map((option) => {
              const href = buildHref(sp, group, option);
              const active = isActive(sp, group, option);

              if (variant === "desktop") {
                return (
                  <Link
                    key={option.label}
                    href={href}
                    className="flex items-center gap-2 text-body hover:text-hover-text"
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      readOnly
                      className="accent-primary"
                    />
                    {option.label}
                  </Link>
                );
              }

              return (
                <SheetClose asChild key={option.label}>
                  <Link
                    href={href}
                    className={`flex items-center justify-between rounded-xs border px-4 py-3 text-sm text-body transition hover:border-primary hover:bg-primary-light ${
                      active
                        ? "border-primary bg-primary-light font-medium text-title"
                        : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    <span>→</span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

/* ================= PAGE ================= */

export default async function ProductListing({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Next.js 15+: searchParams is a Promise — must be awaited
  const sp = await searchParams;

  // API CALL WITH FILTERS
  const res = await getProducts({
    page: Number(sp?.page || 1),
    limit: 12,
    search: sp?.search,
    categoryId: sp?.categoryId,
    sortBy: sp?.sortBy,
    sortOrder: sp?.sortOrder as any,
    minPrice: sp?.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp?.maxPrice ? Number(sp.maxPrice) : undefined,
    brand: sp?.brand,
    rating: sp?.rating ? Number(sp.rating) : undefined,
  });

  const products = res?.data?.data || [];
  const groups = getFilterGroups();

  const meta = res?.data?.meta;
  const currentPage = Number(sp?.page || 1);
  const totalPages = meta?.totalPages || 1;

  const pageBtn =
    "px-4 py-2 border rounded-xs text-sm text-body hover:bg-accent hover:text-accent-foreground transition-colors";

  return (
    <div className="bg-muted min-h-screen">
      <div className="container mx-auto md:px-4 md:py-6">
        {/* BREADCRUMB */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-hover-text">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          {/* ================= LEFT FILTER ================= */}
          <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
            <div className="">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-title">
                  <Filter className="h-4 w-4" />
                  Filters
                </h2>
                <Link
                  className="text-sm text-link hover:text-link-hover hover:underline"
                  href="/products"
                >
                  Reset
                </Link>
              </div>

              <SearchForm sp={sp} variant="desktop" />
              <FilterGroups groups={groups} sp={sp} variant="desktop" />
            </div>
          </div>

          {/* ================= RIGHT PRODUCTS ================= */}
          <div className="flex-1">
            {/* TOP BAR */}
            <div className="px-2 bg-card flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                <span>{products.length} Products</span>
              </div>

              {/* MOBILE FILTER BUTTON (client component) */}
              <div className="lg:hidden">
                <MobileFilter>
                  <SearchForm sp={sp} variant="mobile" />
                  <FilterGroups groups={groups} sp={sp} variant="mobile" />
                </MobileFilter>
              </div>

              <div className="text-sm text-muted-foreground hidden lg:block">
                Use filters to refine
              </div>
            </div>

            {/* PRODUCTS */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {products.map((product: IProduct) => (
                  <ProductCard1 key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-card text-muted-foreground p-10 text-center">
                No products found
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={pageHref(sp, currentPage - 1)}
                    className={pageBtn}
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={pageHref(sp, page)}
                      className={`px-4 py-2 border rounded-xs text-sm transition-colors ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground border-primary"
                          : "text-body hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {page}
                    </Link>
                  ),
                )}

                {currentPage < totalPages && (
                  <Link
                    href={pageHref(sp, currentPage + 1)}
                    className={pageBtn}
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
