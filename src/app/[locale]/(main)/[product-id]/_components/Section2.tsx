"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AdditionalInfoTable from "./AdditionalInfoTable";
import ReviewList from "./Reviews";
import { useGetProductReviewsQuery } from "@/redux/features/reviews/reviewsApi";

interface Product {
  _id: string;
  material: string;
  sizes: string[];
  colors: string[];
  countryOfOrigin: string;
  description: string;
}

const Section2 = ({ product }: { product: Product }) => {
  // Only fetch reviews if product exists
  const { data, isLoading, error } = useGetProductReviewsQuery(
    product?._id,
    { skip: !product?._id } // Skip the query if no product ID is available
  );
  const reviews = data?.data.reviews;

  console.log(data?.data.reviews);
  const [activeTab, setActiveTab] = useState(0);
  
  const tableData = {
    Material: product.material,
    Size: product.sizes,
    Color: product.colors,
    "Country of origin": product.countryOfOrigin,
    Brand: "H&M",
  };

  const tabs = [
    {
      title: "Description",
      content: product.description,
    },
    {
      title: "Shipping Info",
      content: <AdditionalInfoTable data={tableData} />,
    },
    {
      title: "Reviews",
      content: (
        <ReviewList 
          reviews={reviews} 
          isLoading={isLoading}
          error={error}
          totalReviews={reviews?.length || 0}
          showingText={`Showing 1-${reviews?.length || 0} of ${reviews?.length || 0} results`}
        />
      ),
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between border-b border-gray-200 lg:px-14">
        {tabs.map((tab, index) => (
          <Button
            variant="link"
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-6 font-extrabold text-md rounded-none hover:no-underline ${
              activeTab === index
                ? "primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      <div className="p-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;