import Link from "next/link";
import { ArrowRight, Sparkles, Footprints } from "lucide-react";

/* ---------------------------------------------------------
   Amina Sports — Promo Banner (mobile-first, compact on mobile)
   Base classes = mobile. sm: / md: / lg: / xl: progressively enhance.
   Colors use the global theme tokens.
--------------------------------------------------------- */

const PromoBanner = () => {
  return (
    <section
      aria-label="Footwear promotion"
      className="mx-auto my-6 w-full max-w-full sm:my-10  lg:my-14"
    >
      <div className="relative overflow-hidden rounded-md border border-border/20 bg-gradient-dark px-4 py-5 shadow-xl sm:px-8 sm:py-9 md:px-10 md:py-12 lg:px-14 lg:py-14 xl:px-16">
        {/* Decorative background shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-white/5 blur-2xl sm:size-48 lg:-right-16 lg:-top-16 lg:size-56"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 right-4 size-28 rounded-full bg-chart-3/20 blur-xl sm:right-16 sm:size-40 lg:-bottom-20 lg:right-32 lg:size-44"
        />

        <div className="relative z-10 flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-12">
          {/* Offer badge — small pill pinned top-right on mobile, circle on md+ */}
          <div className="absolute right-0 top-0 shrink-0 md:static md:order-last">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-white shadow-lg backdrop-blur-md md:size-36 md:flex-col md:justify-center md:gap-0 md:border-2 md:p-0 md:text-center md:shadow-2xl lg:size-44">
              <span className="text-xs font-extrabold tracking-tight md:text-3xl lg:text-4xl">
                30%
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-chart-5 md:text-[11px] md:tracking-widest lg:text-xs">
                Off Sale
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 max-w-xl text-white lg:max-w-2xl">
            {/* Tag pill hidden on mobile to keep the section short */}
            <div className="mb-3 hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-md sm:inline-flex">
              <Sparkles className="size-3.5 text-chart-5" aria-hidden="true" />
              <span>Step Into Your Style</span>
            </div>

            {/* pr-20 keeps the heading clear of the top-right pill on mobile */}
            <h2 className="pr-20 text-xl font-light uppercase leading-tight tracking-wide sm:pr-0 sm:text-3xl sm:tracking-[0.05em] lg:text-4xl xl:text-5xl">
              Elevate Your Everyday{" "}
              <span className="font-bold text-chart-5">Stride</span>
            </h2>

            <p className="mt-2 line-clamp-2 max-w-lg text-xs font-light leading-relaxed text-white/80 sm:mt-3 sm:line-clamp-none sm:text-base lg:max-w-xl lg:text-lg">
              Explore our premium collection of athletic sneakers, formal shoes,
              and casual footwear built for ultimate comfort and durability.
            </p>

            {/* Buttons: always side by side, equal width on mobile */}
            <div className="mt-4 flex w-full items-center gap-2 sm:mt-6 sm:w-auto sm:gap-3 lg:mt-8">
              <Link
                href="/products"
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 text-[11px] font-bold uppercase tracking-wide text-[#02333a] shadow-md transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:flex-none sm:gap-2 sm:px-6 sm:text-xs sm:tracking-wider"
              >
                <Footprints
                  className="hidden size-4 sm:block"
                  aria-hidden="true"
                />
                Explore Shoes
                <ArrowRight className="size-3.5 sm:size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/products?isFeatured=true"
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:flex-none sm:px-6 sm:text-xs sm:tracking-wider"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
