"use client";
import React from "react";
import ProductImagesSwiper from "./ProductImages";
import ProductInfo, { IProductInfo } from "./ProductInfo";


const Section1 = ({ product }: { product: IProductInfo }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-[500px] max-w-[100%]">
        <ProductImagesSwiper images={product.product.images} />
      </div>
      <ProductInfo product={product.product} />
    </div>
  );
};

export default Section1;
