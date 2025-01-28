import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

interface CartitemProps {
  img: string;
  name: string;
  brandImage: string;
  price: string;
  rating: string;
}

const MainContent: FC<CartitemProps> = ({
  img,
  name,
  brandImage,
  price,
  rating,
}) => {
  const numericRating = parseFloat(rating);

  return (
    <div className="group w-full max-w-[300px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
      <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
        <Image
          src={img}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={600}
          height={800}
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      <div className="mt-3 flex justify-between items-center px-2 md:px-0 h-[20px]">
        <div className="relative w-8 h-8 md:w-7 ">
          <Image
            src={brandImage}
            alt={`${name} brand logo`}
            className="object-contain"
            layout="fill"
          />
        </div>
        <Heart className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors w-4 h-4 md:w-5 md:h-5 " />
      </div>
      <h1 className=" text-sm mt-1 font-semibold text-foreground/90 truncate">
        {name}
      </h1>

      <p className=" text-sm mt-1 md:text-sm font-semibold text-foreground/70 px-2 md:px-0">
        ${price}
      </p>

      <div className="flex items-center gap-1 mt-1 px-2 md:px-0">
        {Array.from({ length: 5 }, (_, index) => {
          const fillAmount = Math.min(1, Math.max(0, numericRating - index));
          const fillPercentage = `${fillAmount * 100}%`;

          return (
            <span key={index} className="relative w-4 h-4 sm:w-4 sm:h-4">
              {/* Gray background star */}
              <Star
                className="absolute top-0 left-0 w-full h-full text-gray-300"
                strokeWidth={1.5}
                fill="transparent"
              />

              {/* Filled portion with mask */}
              <Star
                className="absolute top-0 left-0 w-full h-full text-primary"
                strokeWidth={1.5}
                fill="currentColor"
                style={{
                  mask: `linear-gradient(to right, black ${fillPercentage}, transparent 0%)`,
                  WebkitMask: `linear-gradient(to right, black ${fillPercentage}, transparent 0%)`,
                }}
              />
            </span>
          );
        })}
      </div>
      <Button className="mt-2 bg-secondary text-secondary-foreground">Add to cart</Button>
    </div>
  );
};

export default MainContent;
