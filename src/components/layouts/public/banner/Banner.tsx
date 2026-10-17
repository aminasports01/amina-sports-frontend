"use client";

import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// Components & Icons
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ---------------- MAIN BANNER (Desktop Full Height & Mobile Optimized) ---------------- */
const Banner = () => {
  const slides = [
    {
      id: 1,
      badge: "Limited Time",
      tag: "Special Offer",
      title: "FLASH SALE",
      discount: "17% OFF",
      subtitle: "limited time offer",
      image: "/images/banner1.jpg",
      ctaText: "Grab Deal",
      ctaLink: "/products?sort=deals",
    },
    {
      id: 2,
      badge: "Limited Time",
      tag: "Special Offer",
      title: "FLASH SALE",
      discount: "25% OFF",
      subtitle: "limited time offer",
      image: "/images/banner2.jpg",
      ctaText: "Grab Deal",
      ctaLink: "/products?sort=deals",
    },
  ];

  return (
    <div className="w-full relative group overflow-hidden bg-background">
      {/* CUSTOM NAVIGATION ARROWS (Desktop Only) */}
      <button
        id="banner-prev"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button
        id="banner-next"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all duration-300"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 stroke-[1.5]" />
      </button>

      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        navigation={{
          prevEl: "#banner-prev",
          nextEl: "#banner-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[calc(100vh-120px)] md:min-h-[500px] md:max-h-[800px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* BACKGROUND IMAGE WITH RESPONSIVE OBJECT POSITION */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover object-[85%_center] md:object-center"
                />
                {/* Soft gradient overlay focusing on the left content side */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent md:from-black/60 md:via-black/20 z-10" />
              </div>

              {/* OVERLAY CONTENT (Fitted strictly to the left side) */}
              <div className="relative z-20 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 flex items-center h-full">
                <div className="w-full max-w-[170px] sm:max-w-[220px] md:max-w-md lg:max-w-xl space-y-1.5 sm:space-y-2.5 md:space-y-3">
                  {/* TOP BADGES */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <span className="inline-flex items-center gap-0.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[8px] sm:text-[10px] md:text-xs font-semibold px-1.5 py-0.5 sm:px-2 rounded shadow-xs">
                      <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
                      {slide.badge}
                    </span>
                    <span className="text-white text-[9px] sm:text-xs md:text-sm font-semibold tracking-wider drop-shadow-sm">
                      {slide.tag}
                    </span>
                  </div>

                  {/* MAIN TITLE */}
                  <h1 className="text-base sm:text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none uppercase drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* OFFER CARD BOX */}
                  <div className="bg-card/90 backdrop-blur-md rounded-md sm:rounded-xl p-2 sm:p-3 md:p-4 shadow-lg border border-border mt-1 sm:mt-2">
                    <p className="text-xs sm:text-lg md:text-2xl font-extrabold text-[var(--color-title)] tracking-tight">
                      {slide.discount}
                    </p>
                    <p className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs mt-0.5">
                      {slide.subtitle}
                    </p>

                    <div className="mt-1.5 sm:mt-2">
                      <Link
                        href={slide.ctaLink}
                        className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground py-1 sm:py-2 text-[9px] sm:text-xs font-semibold uppercase tracking-wider rounded transition-all shadow-xs"
                      >
                        {slide.ctaText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* CUSTOM MINIMALIST PAGINATION BULLETS */}
        <div className="custom-swiper-pagination absolute bottom-2 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-1 sm:gap-1.5" />
      </Swiper>

      {/* CUSTOM SWIPER PAGINATION STYLES */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 5px;
          height: 5px;
          background-color: transparent;
          border: 1px solid #ffffff;
          opacity: 0.6;
          margin: 0 2px !important;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        @media (min-width: 640px) {
          .custom-swiper-pagination .swiper-pagination-bullet {
            width: 7px;
            height: 7px;
            margin: 0 3px !important;
          }
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default Banner;
