"use client";
import Rating from "@/components/common/cartItem/Rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface IProductInfo {
  product: {
    brandIcon: string;
    title: string;
    rating: string;
    price: string;
    description: string;
    colors: string[];
    sizes: string[];
    images: string[];
    reviewCount: string;
  };
}

const ProductInfo: FC<IProductInfo> = ({ product }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [activeSize, setActiveSize] = useState(product.sizes[0]);

  useEffect(() => {
    const color = searchParams.get("color");
    const size = searchParams.get("size");

    if (color && product.colors.includes(color)) {
      setActiveColor(color);
    }
    if (size && product.sizes.includes(size)) {
      setActiveSize(size);
    }
  }, [searchParams, product.colors, product.sizes]);

  const updateUrlParams = (params: { color?: string; size?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.color) newParams.set("color", params.color);
    if (params.size) newParams.set("size", params.size);

    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6 sticky h-max  top-0">
      {/* Brand logo and title */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14">
          <Image
            src={product.brandIcon}
            fill
            alt="Brand logo"
            className="object-contain"
          />
        </div>
      </div>
        <h1 className=" font-extrabold text-3xl">{product.title}</h1>

      <div>

      </div>

      {/* Rating and reviews */}
      <div className="flex items-center gap-2">
        <Rating rating={product.rating} />
        <span className="text-sm text-gray-500">
          {product.rating}({product.reviewCount} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="text-2xl font-semibold">${product.price}</div>

      {/* Product details */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg">Product details:</h3>
        <p className="text-foreground/50 text-lg">{product.description}</p>
      </div>

      {/* Color selection */}
      <div className="space-y-2">
        <div className="font-semibold">Color: {activeColor}</div>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setActiveColor(color);
                updateUrlParams({ color });
              }}
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                activeColor === color ? "border-[3px] " : "border-gray-200 opacity-50"
              }`}
              style={{
                backgroundColor: color,
                borderColor: activeColor === color ? color : "",
              }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
      </div>

      {/* Size selection */}
      <div className="space-y-2">
        <div className="font-semibold">Size: {activeSize}</div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              onClick={() => {
                setActiveSize(size);
                updateUrlParams({ size });
              }}
              variant={activeSize === size ? "default" : "outline"}
              className="h-12 w-12 rounded-md"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Add to cart button */}
      <Button variant="secondary" className="w-fll md:w-[200px] font-bold">Add to Cart</Button>
    </div>
  );
};

export default ProductInfo;
