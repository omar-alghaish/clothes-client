"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AdditionalInfoTable from "./AdditionalInfoTable";
import ReviewList from "./Reviews";
import img from "../../../../../assets/images/i12.jpg"


const reviews = [
  {
    id: "1",
    user: "Sara Salah",
    comment: "This T-shirt is stylish and comfortable! The fabric is soft, and it fits just right. The design is unique and stands out, making it easy to dress up or down. Plus, it feels durable, so it's perfect for everyday wear. Definitely a favorite ....See More",
    color: "Gray",
    size: "L",
    date: "04/08/2024",
    avatar: img.src
  },
  {
    id: "2",
    user: "Dohaa Wageh",
    comment: "Love this T-shirt! The style is fresh and versatile, perfect for pairing with different outfits. The material is super soft, making it comfortable all day long. Fits just right--not too loose or tight--and the quality is solid for regular wear....See More",
    color: "Blue",
    size: "XL",
    date: "04/08/2024"
  }
]

interface Product {
  material: string;
  sizes: string[];
  colors: string[];
  countryOfOrigin: string;
  description: string;
}

const Section2 = ({ product }: { product: Product }) => {
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
    }, {
      title: "Shipping Info",
      content: <AdditionalInfoTable data={tableData} />,
    },
    {
      title: "Reviews",
      content: <ReviewList reviews={reviews}
        showingText="Showing 1-4 of 24 results" />,
    },

  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between border-b border-gray-200  lg:px-14">
        {tabs.map((tab, index) => (
          <Button
            variant="link"
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-6 font-extrabold text-md rounded-none hover:no-underline ${activeTab === index
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
