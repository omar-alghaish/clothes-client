"use client";
import React, { useState } from "react";
import ProductImagesSwiper from "./ProductImages";
import img from "../../../../../assets/images/i1.jpg";
import brandIcon from "../../../../../assets/brandIcons/hm.png";
import ProductInfo from "./ProductInfo";
const Section1 = () => {
  const [product] = useState({
    brandIcon: brandIcon.src,
    title: "Classic soft cotton shirt",
    rating: "4.3",
    price: "150",
    details:
      "This is a classic black-and-white striped sweater with a relaxed, oversized fit. It features long sleeves and a crew neckline, offering a casual yet stylish look perfect for everyday wear.",
    colors: ["black", "red", "blue", "yellow"],
    sizes: ["xs", "s", "m", "xl"],
    images: [img.src, img.src, img.src, img.src, img.src],
    reviewCount:"200"
  });
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
