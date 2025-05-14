"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper"
import { Navigation, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import Image from "next/image";

interface ProductImagesSwiperProps {
  images: string[];
  img?: string;
}

const ProductImagesSwiper: React.FC<ProductImagesSwiperProps> = ({
  images,
  img,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // If no images array or empty array, use single img
  const displayImages = images?.length > 0 ? images : img ? [img] : [];

  return (
    <div className="max-w-[800px] mx-auto relative flex flex-col gap-2.5">
      {/* Main Image Swiper */}
      <Swiper
        modules={[Navigation, Thumbs, Zoom]}
        spaceBetween={10}
        navigation
        zoom={{ maxRatio: 3 }}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-[700px] border border-gray-200 rounded-md"
      >
        {displayImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container h-full w-full relative">
              <Image
                src={image}
                alt={`Product view ${index + 1}`}
                className={`object-contain transition-transform duration-300 ${
                  zoomed ? "scale-[2] cursor-move" : "cursor-zoom-in"
                }`}
                onDoubleClick={() => setZoomed(!zoomed)}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Only show thumbnail swiper if we have multiple images */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="w-full h-[130px]"
          direction="horizontal"
        >
          {displayImages.map((image, index) => (
            <SwiperSlide key={index} className="!h-full ">
              <div className="relative h-full w-full rounded-md border-2 border-transparent transition-colors duration-300 cursor-pointer group">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover rounded-lg"
                  fill
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImagesSwiper;
