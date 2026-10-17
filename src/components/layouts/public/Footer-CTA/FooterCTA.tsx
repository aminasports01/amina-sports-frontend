import Link from "next/link";
import {
  ArrowRight,
  Footprints,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="my-12 container mx-auto">
      <div className="relative overflow-hidden rounded-md border border-border bg-gradient-to-r from-secondary via-background to-secondary px-6 py-8 sm:px-8 md:px-10 md:py-10 shadow-sm">
        {/* Subtle Theme Decoration */}
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--color-primary-light)]/40 blur-xl" />
        <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-[var(--color-primary-light)]/30 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-light)] px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Footprints className="h-3.5 w-3.5 text-primary" />
              <span>Made for Your Every Stride</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-title)] sm:text-3xl">
              Find the Perfect Pair You’ll Love
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--color-body)] sm:text-base font-light">
              Explore our latest sneakers and sports footwear collection. Enjoy
              high quality, premium comfort, and a seamless shopping experience.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-[var(--primary-hover)] shadow-sm"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right Features Cards */}
          <div className="grid w-full max-w-sm grid-cols-3 gap-3 md:max-w-md">
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3.5 text-center shadow-xs transition-all hover:border-primary/30 sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>

              <p className="text-xs font-semibold text-[var(--color-title)] sm:text-sm">
                Wide Choice
              </p>

              <p className="mt-1 hidden text-[11px] text-[var(--color-body)] sm:block">
                Top sneaker brands
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3.5 text-center shadow-xs transition-all hover:border-primary/30 sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                <Truck className="h-5 w-5 text-primary" />
              </div>

              <p className="text-xs font-semibold text-[var(--color-title)] sm:text-sm">
                Fast Delivery
              </p>

              <p className="mt-1 hidden text-[11px] text-[var(--color-body)] sm:block">
                Across Bangladesh
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-3.5 text-center shadow-xs transition-all hover:border-primary/30 sm:p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>

              <p className="text-xs font-semibold text-[var(--color-title)] sm:text-sm">
                100% Original
              </p>

              <p className="mt-1 hidden text-[11px] text-[var(--color-body)] sm:block">
                Authentic shoes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
