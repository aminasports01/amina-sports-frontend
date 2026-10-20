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

  const selectedIndex = selectedImage
    ? galleryImages.indexOf(selectedImage)
    : -1;

  const currentIndex = selectedIndex >= 0 ? selectedIndex : activeIndex;
  const totalImages = galleryImages.length;

  useEffect(() => {
    if (selectedIndex >= 0 && swiperRef.current) {
      if (swiperRef.current.activeIndex !== selectedIndex) {
        swiperRef.current.slideTo(selectedIndex);
      }
    }
  }, [selectedIndex]);

  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.realIndex;
    setActiveIndex(index);

    const image = galleryImages[index];

    if (image && image !== selectedImage) {
      setSelectedImage(null);
    }
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
    </div>
  );
};

export default ProductGallery;
