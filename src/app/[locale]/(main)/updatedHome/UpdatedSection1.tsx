'use client'
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import b0 from '../../../../assets/backgrounds/Home.png';
import b1 from "../../../../assets/backgrounds/b1.webp";
import b2 from "../../../../assets/backgrounds/b9.png";
import b3 from "../../../../assets/backgrounds/b10.png";
import b4 from "../../../../assets/backgrounds/b11.png";
import b5 from "../../../../assets/backgrounds/b12.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const images = [b0, b1, b2, b3, b4, b5];

const UpdatedSection1 = () => {
    const t = useTranslations("HomePage.section1");

    return (
        <section className="relative w-full h-[100vh]">
            <Swiper
                pagination={{ dynamicBullets: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="w-full h-full"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                        <Image
                            src={image.src}
                            alt={`background-${index}`}
                            fill
                            priority={index === 0}
                            className="object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay content */}
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 w-[1200px] max-w-full px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">
                    {t("heading")}
                </h1>
                <Link href={'/shop'} >
                    <Button className="w-64 sm:w-80 h-[50px] text-lg font-semibold text-primary-foreground bg-primary hover:bg-primary-600 transition-colors duration-300">
                        Shop Now
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default UpdatedSection1;
