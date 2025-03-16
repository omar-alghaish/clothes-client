"use client";

import { CartItem } from "@/components/common";
import { useGetNewArrivalsProductsQuery } from "@/redux/features/products/productsApi";

interface ProductItem {
  img: string;
  name: string;
  brand: {
    _id: string;
    brandName: string;
    brandLogo: string
  };
  price: string;
  rating: string;
  _id: string;
}

const Section3 = () => {
  const { data, isLoading, error } = useGetNewArrivalsProductsQuery({});
console.log(data);
  return (
    <section>
      <div className="container flex flex-col gap-10 py-10 px-4">
        {/* Title Section */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            New Arrival
          </h1>
          <p className="prose prose-xl text-foreground/70 text-center">
            Our newest arrivals are here! Discover pieces that bring style and
            confidence to your everyday look.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 font-semibold">
            Failed to load products. Please try again later.
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && data?.data?.items?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {data.data.items.slice(0, 8).map((item: ProductItem, index: number) => (
              <CartItem
                key={index}
                img={item.img}
                name={item.name}
                brand={item.brand}
                price={item.price}
                rating={item.rating}
                _id={item._id}
              />
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!isLoading && !error && data?.data?.items?.length === 0 && (
          <div className="text-center text-gray-500 font-semibold">
            No new arrivals at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Section3;
