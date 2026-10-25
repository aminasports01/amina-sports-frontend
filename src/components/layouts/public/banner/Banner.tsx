"use client";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// Components & Icons
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// desktop banner image size: 1920px × 800px
//mobile banner image size : 1080×1920
const slides = [
  {
    id: 1,
    eyebrow: "Amina Sports 2026",
    title: "BEYOND",
    titleAccent: "THE LIMITS.",
    description:
      "Elevate your game. Premium sportswear for those who refuse to blend in.",
    imageMobile: "/images/banner-mobile-1.png",
    imageDesktop: "/images/banner-desktop-1.png",
    ctas: [
      { text: "Shop Now", link: "/products" },
      { text: "View Deals", link: "/products?sort=deals" },
    ],
  },
  // {
  //   id: 2,
  //   eyebrow: "New Season",
  //   title: "BUILT FOR",
  //   titleAccent: "PERFORMANCE.",
  //   description:
  //     "Engineered comfort and timeless design, crafted for every move you make.",
  //   imageMobile: "/images/banner-mobile-2.jpg",
  //   imageDesktop: "/images/banner-desktop-2.jpg",
  //   ctas: [
  //     { text: "Shop Now", link: "/products" },
  //     { text: "View Deals", link: "/products?sort=deals" },
  //   ],
  // },
];

const Banner = () => {
  return (
    <section className="w-full relative group overflow-hidden bg-background">
      {/* DESKTOP NAVIGATION ARROWS */}
      <button
        id="banner-prev"
        className="hidden md:flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
      </button>

      <button
        id="banner-next"
        className="hidden md:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-primary-foreground hover:text-primary transition-all duration-300"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.5]" />
      </button>

      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        navigation={{ prevEl: "#banner-prev", nextEl: "#banner-next" }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop
        className="w-full h-[calc(100svh-50px)] min-h-[560px] md:h-[calc(100vh-120px)] md:min-h-[580px] md:max-h-[860px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* ---------- BACKGROUND IMAGES ---------- */}
              <div className="absolute inset-0 z-0">
                {/* Mobile image */}
                <Image
                  src={slide.imageMobile}
                  alt={`${slide.title} ${slide.titleAccent}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center md:hidden"
                />
                {/* Desktop image */}
                <Image
                  src={slide.imageDesktop}
                  alt={`${slide.title} ${slide.titleAccent}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="hidden md:block object-cover object-center"
                />

                {/* Mobile overlay*/}
                <div className="absolute inset-0 md:hidden bg-gradient-to-t from-primary/90 via-primary/35 to-transparent" />
                {/* Desktop overlay*/}
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-primary/75 via-primary/30 to-transparent" />
              </div>

              {/* ---------- CONTENT ---------- */}
              <div className="relative z-20 h-full container mx-auto px-6 md:px-16 lg:px-24 flex flex-col justify-end md:justify-center pb-16 md:pb-0">
                <div className="w-full max-w-xl text-primary-foreground">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="h-px w-8 md:w-12 bg-primary-foreground/60" />
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] text-primary-foreground/80">
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-heading  uppercase leading-[0.9] tracking-tight text-[3.5rem] sm:text-7xl md:text-7xl lg:text-8xl">
                    <span className="block">{slide.title}</span>
                    <span className="block italic text-primary-foreground/85">
                      {slide.titleAccent}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mt-5 md:mt-7 max-w-sm md:max-w-md text-sm md:text-base leading-relaxed text-primary-foreground/75">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 md:mt-10 flex flex-col md:flex-row gap-3 md:gap-4">
                    <Link
                      href={slide.ctas[0].link}
                      className="inline-flex items-center justify-center md:min-w-[200px] px-8 py-4 rounded-sm bg-background text-foreground text-xs md:text-sm font-bold uppercase tracking-[0.3em] hover:bg-secondary transition-colors duration-300"
                    >
                      {slide.ctas[0].text}
                    </Link>
                    <Link
                      href={slide.ctas[1].link}
                      className="inline-flex items-center justify-center md:min-w-[200px] px-8 py-4 rounded-sm border border-primary-foreground/60 text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-[0.3em] hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
                    >
                      {slide.ctas[1].text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* MINIMAL PAGINATION (line style) */}
        <div className="custom-swiper-pagination absolute bottom-5 md:bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-2" />
      </Swiper>

      {/* PAGINATION STYLES (global CSS variable ব্যবহার করা হয়েছে) */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 18px;
          height: 2px;
          border-radius: 0;
          background-color: var(--primary-foreground);
          opacity: 0.4;
          margin: 0 !important;
          transition: all 0.4s ease;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 36px;
          opacity: 1;
          background-color: var(--primary-foreground) !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;
