"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductStore } from "@/store/product.store";

import "swiper/css";

interface ProductGalleryProps {
  thumbnail: string;
  images: string[];
  productName: string;
}

const ProductGallery = ({
  thumbnail,
  images,
  productName,
}: ProductGalleryProps) => {
  const selectedImage = useProductStore((state) => state.selectedImage);
  const setSelectedImage = useProductStore((state) => state.setSelectedImage);

  const galleryImages = useMemo(
    () => Array.from(new Set([thumbnail, ...(images || [])].filter(Boolean))),
    [thumbnail, images],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const thumbItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedIndex = selectedImage
    ? galleryImages.indexOf(selectedImage)
    : -1;

  const currentIndex = selectedIndex >= 0 ? selectedIndex : activeIndex;
  const totalImages = galleryImages.length;

  // Color/variant বাছলে সেই ছবিতে slide করে (loop mode এ slideToLoop লাগে)
  useEffect(() => {
    if (selectedIndex >= 0 && swiperRef.current) {
      if (swiperRef.current.realIndex !== selectedIndex) {
        swiperRef.current.slideToLoop(selectedIndex);
      }
    }
  }, [selectedIndex]);

  // সক্রিয় thumbnail যেন সবসময় দেখা যায় (শুধু thumbnail বারের ভেতরে স্ক্রল করে)
  useEffect(() => {
    const container = thumbsRef.current;
    const item = thumbItemRefs.current[currentIndex];
    if (!container || !item) return;

    container.scrollTo({
      left: item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.realIndex;
    setActiveIndex(index);

    const image = galleryImages[index];

    if (image && image !== selectedImage) {
      setSelectedImage(null);
    }
  };

  const handleThumbClick = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };

  if (totalImages === 0) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center bg-white text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ---------- Main image ---------- */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;

            const index = swiper.realIndex;
            setActiveIndex(index);
          }}
          onSlideChange={handleSlideChange}
          initialSlide={selectedIndex >= 0 ? selectedIndex : 0}
          slidesPerView={1}
          spaceBetween={0}
          speed={400}
          loop={totalImages > 1}
          className="h-full w-full"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={image}>
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                  quality={95}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>

            <div className="absolute bottom-3 right-3 z-10">
              <span className="bg-white/75 px-2 py-1 text-sm text-foreground backdrop-blur-sm">
                {currentIndex + 1} / {totalImages}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ---------- Small gallery (thumbnails) ---------- */}
      {totalImages > 1 && (
        <div
          ref={thumbsRef}
          className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {galleryImages.map((image, index) => {
            const active = index === currentIndex;

            return (
              <button
                key={image}
                ref={(el) => {
                  thumbItemRefs.current[index] = el;
                }}
                type="button"
                onClick={() => handleThumbClick(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={active}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border-2 bg-muted transition-all sm:w-20 ${
                  active
                    ? "border-foreground"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
