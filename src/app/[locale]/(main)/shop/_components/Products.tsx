import { CartItem } from '@/components/common';
import React, { FC } from 'react';
import { CartitemProps } from '@/components/common/cartItem/components/MainContent';

interface IProducts {
  searchParams?: {
    page?: string;
  };
  itemsPerPage?: number;
  items?: CartitemProps[];
  totalItems?: number;
  totalPages?: number;
  error?: Error;
  isLoading?: boolean;
}


const Products: FC<IProducts> = ({  items }) => {
console.log(items)
  return (
    <div className="space-y-6 flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {(items || []).map((item, index) => (
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
    </div>
  );
};

export default Products;
