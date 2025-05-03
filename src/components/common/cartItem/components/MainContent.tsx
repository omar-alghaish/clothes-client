"use client"
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import Rating from "../Rating";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { toast, Toaster } from "sonner";
export interface CartitemProps {
  _id: string;
  img: string;
  name: string;
  brand: {
    _id: string;
    brandName: string;
    brandLogo: string;
  };
  price: string;
  rating: string;
}

const MainContent: FC<CartitemProps> = ({ img, name, price, rating, _id }) => {
  const locale = useLocale();
  const checkAuth = useAuthRedirect();
  const [imgLoading, setImgLoading] = useState(true);
  const [brandImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const [addToCart] = useAddToCartMutation();
   useEffect(() => {
    // Check if image is already cached
    if (imgRef.current?.complete) {
      setImgLoading(false);
    }
  }, []);

  const handleAddToCart = (id: string) => {
    checkAuth(async () => {
      try {
        await addToCart({
          id,
          quantity: "1",
          price
        }).unwrap();
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Failed to add item to cart!");
        console.error("Failed to add item to cart:", error);
      }
    });
  };
  const handleLove = (id: string) => {
    checkAuth(() => {
      console.log("Action executed: User is authenticated!", id);
      // Perform authenticated action
    });
  };

  return (
    <div className="group w-full max-w-[300px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
      <Toaster />
      <Link href={`/${locale}/${_id}`}>
        <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
          {imgLoading && (
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          )}

          {img && (
            <Image
              ref={imgRef}
              src={img}
              alt={`Image of ${name}`}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imgLoading ? "hidden" : "block"
                }`}
              width={600}
              height={800}
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 33vw"
              priority={true}  // Important for above-the-fold images
              onLoad={() => setImgLoading(false)}
              onError={() => setImgLoading(false)}
              onLoadingComplete={() => setImgLoading(false)}
            />
          )}
        </div>
      </Link>

      <div className="mt-3 flex justify-between items-center px-2 md:px-0 h-[20px]">
        <div className="relative w-8 h-8 md:w-7">
          {brandImgLoading && (
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-full"></div>
          )}
          {/* {brand?.brandLogo && (
            <Image
              src={brand.brandLogo}
              alt={`${name} brand logo`}
              className={`object-contain ${brandImgLoading ? "hidden" : "block"}`}
              layout="fill"
              priority={true}
              onLoad={() => setBrandImgLoading(false)}
              onError={() => setBrandImgLoading(false)}
            />
          )} */}
        </div>
        <Heart
          onClick={() => handleLove(_id)}
          className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors w-4 h-4 md:w-5 md:h-5"
        />
      </div>

      <h1 className="text-sm mt-1 font-semibold text-foreground/90 truncate">{name}</h1>
      <p className="text-sm mt-1 md:text-sm font-semibold text-foreground/70 px-2 md:px-0">
        ${price}
      </p>

      <Rating rating={rating} size="sm" className="mt-1 px-2 md:px-0" />
      <Button
        onClick={() => handleAddToCart(_id)}
        className="mt-2 bg-secondary text-secondary-foreground hover:text-secondary-foreground/70 hover:bg-secondary/70"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default MainContent;