"use client";
import Rating from "@/components/common/cartItem/Rating";
import { Button } from "@/components/ui/button";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export interface IProductInfo {
  product: {
    _id: string;
    brand: {
      _id: string;
      brandName: string;
      brandLogo: string;
    };
    name: string;
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
  const checkAuth = useAuthRedirect();

  const searchParams = useSearchParams();
  const [activeColor, setActiveColor] = useState(product?.colors[0]);
  const [activeSize, setActiveSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addToCart] = useAddToCartMutation();

  const local = useLocale()
  useEffect(() => {
    // Get parameters from URL or use defaults
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const qtyParam = searchParams.get("quantity");

    // Set default URL parameters if they don't exist
    const newParams = new URLSearchParams(searchParams.toString());
    let shouldUpdateUrl = false;

    if (!color) {
      newParams.set("color", product.colors[0]);
      shouldUpdateUrl = true;
    } else if (product.colors.includes(color)) {
      setActiveColor(color);
    }

    if (!size) {
      newParams.set("size", product.sizes[0]);
      shouldUpdateUrl = true;
    } else if (product.sizes.includes(size)) {
      setActiveSize(size);
    }

    if (!qtyParam) {
      newParams.set("quantity", "1");
      shouldUpdateUrl = true;
    } else {
      const parsedQty = parseInt(qtyParam, 10);
      if (!isNaN(parsedQty) && parsedQty > 0) {
        setQuantity(parsedQty);
      }
    }

    // Update URL with default parameters if needed
    if (shouldUpdateUrl) {
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, product.colors, product.sizes, router]);

  const updateUrlParams = (params: { color?: string; size?: string; quantity?: number }) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (params.color) newParams.set("color", params.color);
    if (params.size) newParams.set("size", params.size);
    if (params.quantity) newParams.set("quantity", params.quantity.toString());

    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleAddToCart = (id: string) => {
    // Get current quantity from URL in case it's been updated
    const qtyParam = searchParams.get("quantity");
    const currentQuantity = qtyParam ? parseInt(qtyParam, 10) : quantity;

    checkAuth(async () => {
      try {
        await addToCart({
          id,
          quantity: currentQuantity.toString(),
          price: product.price,
          color: activeColor,
          size: activeSize
        }).unwrap();
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Failed to add item to cart!");
        console.error("Failed to add item to cart:", error);
      }
    });
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateUrlParams({ quantity: newQuantity });
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateUrlParams({ quantity: newQuantity });
    }
  };

  return (
    <div className="space-y-6 sticky h-max top-0">
      {/* Brand logo and title */}
      <Toaster />
      {
        product.brand.brandLogo ? <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <Image
              src={product.brand.brandLogo}
              fill
              alt="Brand logo"
              className="object-contain"
            />
          </div>
        </div> : <div>
          <h1>{product.brand.brandName}</h1>
        </div>
      }

      <h1 className="font-extrabold text-3xl">{product.name}</h1>

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
              className={`h-10 w-10 rounded-full border-2 transition-all ${activeColor === color ? "border-[3px] " : "border-gray-200 opacity-50"
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

      {/* Quantity selector */}
      <div className="space-y-2">
        <div className="font-semibold">Quantity:</div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
          >
            +
          </Button>
        </div>
      </div>

      {/* Add to cart button */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="flex-1 md:w-[200px] font-bold"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </Button>
        <Link className="bg-foreground text-background flex items-center h-9 px-4 rounded-md" href={`/${local}/ai/${product._id}`}>Try it</Link>
      </div>
    </div>
  );
};

export default ProductInfo;