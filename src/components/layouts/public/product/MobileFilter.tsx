"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const triggerClass =
  "flex items-center gap-2  bg-card text-foreground px-4 py-2 text-sm font-medium ";

// Server এ false, client এ true — hydration mismatch এড়াতে
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export function MobileFilter({ children }: { children: ReactNode }) {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <button type="button" className={triggerClass}>
        <Filter className="h-4 w-4" />
        Filters
      </button>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className={triggerClass}>
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[320px] overflow-y-auto p-0">
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-card border-b px-5 py-4 flex items-center justify-between">
          <SheetHeader className="space-y-0">
            <SheetTitle className="text-lg text-title">Filters</SheetTitle>
          </SheetHeader>

          <SheetClose asChild>
            <Link
              href="/products"
              className="text-sm text-link font-medium hover:text-link-hover hover:underline"
            >
              Reset
            </Link>
          </SheetClose>
        </div>

        <div className="p-5">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
