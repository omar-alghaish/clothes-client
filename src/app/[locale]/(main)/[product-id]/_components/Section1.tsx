"use client";
import React from "react";
import ProductImagesSwiper from "./ProductImages";
import ProductInfo from "./ProductInfo";
import { IProduct } from "./MainContent";


const Section1 = ({ product }: { product: IProduct }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-[500px] max-w-[100%]">
        <ProductImagesSwiper images={product.images} />
      </div>
      <ProductInfo product={product} />
    </div>
  );
};

export default Section1;
