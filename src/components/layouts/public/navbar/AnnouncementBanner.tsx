"use client";
import { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";

const announcements = [
  "🚚 Delivery all over Bangladesh",
  "💵 Cash on Delivery, pay when you receive",
  "📍 Delivery ৳90 in Dhaka, ৳130 outside",
  "🔄 Easy size exchange within 3 days",
  "👟 Premium sneakers for men and women",
  "📞 We confirm every order by phone",
];

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  // Rotate announcement every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev + 1 >= announcements.length) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full z-40 flex justify-between items-center py-2 border-b bg-foreground dark:bg-foreground">
      {/* Left spacer */}
      <div className="w-6" />

      {/* Centre — rotating text */}
      <div className="flex items-center gap-2 mx-auto">
        <span className="inline-flex items-center justify-center w-6 h-6 shrink-0 bg-background/20 rounded-full">
          <Megaphone size={13} className="text-background" />
        </span>
        <p
          key={current}
          className="font-body text-xs sm:text-sm text-background text-center animate-fade-in"
        >
          {announcements[current]}
        </p>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-sm text-background/70 hover:text-background hover:bg-background/10 transition-colors duration-200"
        aria-label="Close banner"
      >
        <X size={20} />
      </button>
    </div>
  );
}
