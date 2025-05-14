"use client";
import React from "react";
import ProductImagesSwiper from "./ProductImages";
import ProductInfo from "./ProductInfo";

interface product {
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
  img?: string;
  reviewCount: string;
};

const Section1 = ({ product }: { product: product }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-[500px] max-w-[100%]">
        <ProductImagesSwiper images={product?.images} img={product?.img} />
      </div>
      <ProductInfo product={product} />
    </div>
  );
};

export default Section1;
