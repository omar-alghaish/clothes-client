"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import { useGetCategoriesQuery, useGetBrandsQuery } from "@/redux/features/category/categoryApi";
const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useGetCategoriesQuery();

  const categories = data?.data?.categories || [];
  const { data: brandsData } = useGetBrandsQuery();
  const brands = brandsData?.data?.brands || [];
  const colors = ["red", "blue", "green", "black", "white", "brown"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const prices = ["0 - 50", "50 - 100", "100 - 150", "150 - 200", "200+"];

  // Current filters
  const currentFilters = {
    category: searchParams.getAll("category"),
    color: searchParams.getAll("color"),
    size: searchParams.getAll("size"),
    brand: searchParams.getAll("brand"),
    price: searchParams.getAll("price"),
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const values = params.getAll(filterType);
    if (values.includes(value)) {
      params.delete(filterType);
      values.filter(v => v !== value).forEach(v => params.append(filterType, v));
    } else {
      params.append(filterType, value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Master category handling
  const handleMasterCategory = (gender: "male" | "female") => {
    const params = new URLSearchParams(searchParams);
    const subCategories = {
      male: ["male-shirt", "male-pants", "male-shoes", "male-jacket"],
      female: ["female-dresses", "female-tops", "female-shoes", "female-jacket"]
    }[gender];

    const current = params.getAll("category");
    const allSelected = subCategories.every(sc => current.includes(sc));

    // Remove existing gender categories
    const newCategories = current.filter(c => !subCategories.includes(c));
    
    if (!allSelected) {
      newCategories.push(...subCategories);
    }

    params.delete("category");
    newCategories.forEach(c => params.append("category", c));
    
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Calculate master checkbox states
  const maleCategories = ["male-shirt", "male-pants", "male-shoes", "male-jacket"];
  const femaleCategories = ["female-dresses", "female-tops", "female-shoes", "female-jacket"];
  
  const maleSelected = currentFilters.category.filter(c => maleCategories.includes(c));
  const femaleSelected = currentFilters.category.filter(c => femaleCategories.includes(c));

  const maleAllSelected = maleSelected.length === maleCategories.length;
  const femaleAllSelected = femaleSelected.length === femaleCategories.length;

  return (
    <div className="w-full border p-4 rounded-lg">
      <Accordion type="multiple" className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <Accordion type="multiple" className="pl-4">
              {/* Male Category */}
              <AccordionItem value="male" className="border-none">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={maleAllSelected}
                    onCheckedChange={() => handleMasterCategory("male")}
                  />
                  <AccordionTrigger>Male</AccordionTrigger>
                </div>
                <AccordionContent className="flex flex-col space-y-2 ml-6">
                  {categories?.map((item) => (
                    <div key={item._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`male-${item._id}`}
                        checked={currentFilters.category.includes(`male-${item.name}`)}
                        onCheckedChange={() => handleFilterChange("category", `male-${item.name}`)}
                      />
                      <Label htmlFor={`male-${item._id}`}>{item.name}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Female Category */}
              <AccordionItem value="female" className="border-none">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={femaleAllSelected}
                    onCheckedChange={() => handleMasterCategory("female")}
                  />
                  <AccordionTrigger>Female</AccordionTrigger>
                </div>
                <AccordionContent className="flex flex-col space-y-2 ml-6">
                  {categories?.map((item) => (
                    <div key={item._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`female-${item._id}`}
                        checked={currentFilters.category.includes(`female-${item.name}`)}
                        onCheckedChange={() => handleFilterChange("category", `female-${item.name}`)}
                      />
                      <Label htmlFor={`female-${item._id}`}>{item.name}</Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Rest of the filters remain unchanged */}
        {/* Color Filter */}
        <AccordionItem value="color" className="border-none">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={color}
                  checked={currentFilters.color.includes(color)}
                  onCheckedChange={() => handleFilterChange("color", color)}
                />
                <Label htmlFor={color}>{color}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-none">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={currentFilters.size.includes(size) ? "default" : "outline"}
                onClick={() => handleFilterChange("size", size)}
              >
                {size}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand" className="border-none">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-2">
            {brands.map((brand) => (
              <div key={brand._id} className="flex items-center space-x-2">
                <Checkbox
                  id={brand._id}
                  checked={currentFilters.brand.includes(brand.brandName)}
                  onCheckedChange={() => handleFilterChange("brand", brand.brandName)}
                />
                <Label htmlFor={brand._id}>{brand.brandName}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-2">
            {prices.map((price) => (
              <div key={price} className="flex items-center space-x-2">
                <Checkbox
                  id={price}
                  checked={currentFilters.price.includes(price)}
                  onCheckedChange={() => handleFilterChange("price", price)}
                />
                <Label htmlFor={price}>${price}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filters;