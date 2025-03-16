"use client";

import React from "react";
import Filters from "./Filters";
import ActiveFilters from "./ActiveFilters";
import Products from "./Products";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Banner from "./Banner";
import { Pagination } from "@/components/common/pagination";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { useSearchParams } from "next/navigation";

// Skeleton Loading Component
const ProductSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 ">
          <div className="h-[500px] bg-gray-200 rounded w-full dark:bg-gray-700"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-700"></div>
          <div className="h-8 bg-gray-200 rounded-md w-full mt-2 dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  </div>
);

// Active Filters Skeleton
const ActiveFiltersSkeleton = () => (
  <div className="animate-pulse flex items-center gap-4">
    <div className="h-8 bg-gray-200 rounded-md w-48 dark:bg-gray-700"></div>
    <div className="h-8 bg-gray-200 rounded-md w-24 dark:bg-gray-700"></div>
  </div>
);

const MainContent = () => {
  const searchParams = useSearchParams();

  // Get all parameters as arrays
  const categoryParams = searchParams.getAll('category');
  const colorParams = searchParams.getAll('color');
  const brandParams = searchParams.getAll('brand');
  const priceParams = searchParams.getAll('price');
  const pageParam = searchParams.get('page');

  const currentPage = Number(pageParam) || 1;

  const { data, isLoading, error } = useGetProductsQuery({
    category: categoryParams,
    color: colorParams,
    brand: brandParams,
    price: priceParams,
    page: currentPage,
  });
console.log(data)
  const totalItems = data?.totalItems || 0;
  const totalPages = data?.totalPages || 1;

  // Calculate the displayed range
  const startItem = (currentPage - 1) * (data?.results || 8) + 1;
  const endItem = Math.min(currentPage * (data?.results || 8), totalItems);
  const currentDisplay = `${startItem}-${endItem} of ${totalItems} results`;

  return (
    <div className="container px-4 flex flex-col gap-10">
      <div className="mt-20 flex flex-col md:flex-row gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block w-full md:w-[250px] lg:w-[300px] sticky top-20 h-max">
          <Filters />
        </div>

        {/* Mobile Filters Drawer */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="default"
                className="fixed bottom-4 right-4 z-20 shadow-lg"
                size="lg"
              >
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh] overflow-hidden">
              <ScrollArea className="h-[70vh] overflow-y-auto p-4">
                <Filters />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {isLoading ? (
            <ActiveFiltersSkeleton />
          ) : (
            <ActiveFilters currentDisplay={currentDisplay} />
          )}

          {isLoading ? (
            <ProductSkeleton />
          ) : error ? (
            <div className="h-screen w-full flex items-center justify-center">
              Error loading products
            </div>
          ) : (
            <Products items={data?.data?.items || []} />
          )}
        </div>
      </div>

      {!isLoading && <Pagination totalPages={totalPages} />}

      <Banner />
    </div>
  );
};

export default MainContent;