"use client";

import React from "react";
import { useParams } from "next/navigation";
import Section1 from "./Section1";
import Section2 from "./Section2";
import { useGetProductQuery } from "@/redux/features/products/productsApi";
export interface IProduct {
  brandIcon: string;
  title: string;
  rating: string;
  price: string;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  reviewCount: string;
}
const MainContent = () => {
  const params = useParams(); // Get all URL params
  const productId = Array.isArray(params["product-id"]) ? params["product-id"][0] : params["product-id"] || ""; // Ensure 'product-id' is a string

  const { data, isLoading, error } = useGetProductQuery(productId);

  console.log(data);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading product</div>;

  return (
    <div className="container mt-[100px] space-y-10 px-6">
      <Section1 product={data.data.item} />
      <Section2 product={data.data.item} />
    </div>
  );
};

export default MainContent;
