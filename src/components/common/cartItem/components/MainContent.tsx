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
import { useAddFavProductMutation, useDeleteFavProductMutation } from "@/redux/features/favorites/favoritesApi";

export interface CartitemProps {
  _id: string;
  img: string;
  name?: string;
  title?:string;
  categoryField?:string;
  brand: {
    _id: string;
    brandName: string;
    brandLogo: string;
  };
  price: string;
  rating: string;
  isFavorite?: boolean;
  onClick?: () => void;
  isBrand?: boolean;
}

const MainContent: FC<CartitemProps> = ({ img, name, price, rating, _id, isFavorite = false, onClick, isBrand = false, brand }) => {
  const locale = useLocale();
  const checkAuth = useAuthRedirect();
  const [imgLoading, setImgLoading] = useState(true);
  const [brandImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const [isFav, setIsFav] = useState(isFavorite);
  const [addToCart] = useAddToCartMutation();
  const [addFavProduct] = useAddFavProductMutation();
  const [deleteFavProduct] = useDeleteFavProductMutation();

  useEffect(() => {
    // Check if image is already cached
    if (imgRef.current?.complete) {
      setImgLoading(false);
    }
  }, []);

  // Update isFav when isFavorite prop changes (helpful for list refreshes)
  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

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

  const handleLove = (itemId: string) => {
    checkAuth(async () => {
      try {
        if (isFav) {
          // Remove from favorites
          await deleteFavProduct(itemId).unwrap();
          setIsFav(false);
          toast.success("Removed from favorites!");
        } else {
          // Add to favorites
          await addFavProduct(itemId).unwrap();
          setIsFav(true);
          toast.success("Added to favorites!");
        }
      } catch (err: unknown) {
        toast.error(isFav ? "Failed to remove from favorites" : "Failed to add to favorites");
        console.error("Favorite operation error:", err);
      }
    });
  };

  return (
    <div className="group w-full max-w-[300px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
      <Toaster />
      <Link href={`/${locale}/${_id}`} onClick={onClick}>
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
          {brandImgLoading && isBrand && (
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-full"></div>
          )}
          {isBrand && (
            <Image
              src={brand.brandLogo}
              alt={brand.brandName}
              className="w-full h-full object-cover rounded-full"
              width={32}
              height={32}
            />
          )}
        </div>
        <Heart
          onClick={() => handleLove(_id)}
          className={`cursor-pointer transition-colors w-4 h-4 md:w-5 md:h-5 ${isFav ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
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