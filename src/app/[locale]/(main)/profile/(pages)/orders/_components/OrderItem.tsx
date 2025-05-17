import Image from "next/image";
import React, { FC } from "react";

export interface ItemData {
  _id: string;
  color: string;
  size: string;
  product: {
    name: string;
    img: string;
  };
  brand: {
    brandLogo: string;
  };
}



const OrderItem: FC<ItemData> = ({ color, size, brand, product }) => {
  // Destructure the first item in each tuple/array


  return (
    <div className="flex gap-4">
      <div className="h-[150px] w-[130px]">
        <Image
          className="object-cover w-full h-full rounded-md"
          src={product?.img}
          width={1000}
          height={1000}
          alt="product image"
        />
      </div>
      <div className="space-y-2">
        <h1 className="font-extrabold text-xl">{product?.name}</h1>
        <p className="text-foreground/50 text-lg font-bold">Color: {color}</p>
        <p className="text-foreground/50 text-lg font-bold">Size: {size}</p>
        <p className="flex gap-2 items-center text-foreground/50 text-lg font-bold">
          Brand:
          <div className="h-[15px] w-[100px]">
            <img
              className="object-cover h-full rounded-md"
              src={brand?.brandLogo}
              width={1000}
              height={1000}
              alt="brand logo"
            />
          </div>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
