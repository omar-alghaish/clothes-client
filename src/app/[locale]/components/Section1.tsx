"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import b1 from "../../../assets/backgrounds/b1.webp";
import b2 from "../../../assets/backgrounds/b9.png";
import b3 from "../../../assets/backgrounds/b10.png";
import b4 from "../../../assets/backgrounds/b11.png";
import b5 from "../../../assets/backgrounds/b12.png";

const images = [b1, b2, b3, b4, b5];

const Section1 = () => {
  const t = useTranslations("HomePage.section1");

  return (
    <section className="relative h-screen">
      <Swiper
        className="h-screen w-full"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        effect="fade"
        speed={1000}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={1800}
              height={1200}
              alt={`background-${index}`}
              className="w-full h-full object-cover"
              src={image.src}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-[1200px] max-w-full p-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center">
          {t("heading")}
        </h1>
        <Button className="w-80 h-[50px] text-lg font-semibold text-primary-foreground bg-primary hover:bg-primary-600 transition-colors duration-300">
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default Section1;
