import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        {/* Brand */}
        <p className="text-2xl font-bold uppercase tracking-widest text-title">
          Amina Sports
        </p>

        {/* 404 */}
        <p className="text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
          404
        </p>

        {/* Message */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-title">
            We can&apos;t find that page
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            The page you are looking for may have moved or no longer exists.
            Please go back home or see our products.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-full bg-button px-8 py-3.5 text-center text-base font-semibold text-button-text transition-colors hover:bg-button-hover sm:w-auto"
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className="w-full rounded-full border border-border px-8 py-3.5 text-center text-base font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            Shop Products
          </Link>
        </div>
      </div>
    </main>
  );
}
