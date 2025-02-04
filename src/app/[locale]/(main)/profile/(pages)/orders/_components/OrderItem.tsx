import Image from "next/image";
import React, { FC } from "react";

export interface IOrderItem {
  img: string;
  title: string;
  color: string;
  size: string;
  brandIcon: string;
}
const OrderItem: FC<IOrderItem> = ({ img, title, color, size, brandIcon }) => {
  return (
    <div className="flex gap-4">
      <div className="h-[150px] w-[130px]">
        <Image
          className="object-cover w-full h-full rounded-md"
          src={img}
          width={1000}
          height={1000}
          alt={`${title}`}
        />
      </div>
      <div className="space-y-2 ">
        <h1 className="font-extrabold text-xl">{title}</h1>
        <p className="text-foreground/50 text-lg font-bold">Color: {color}</p>
        <p className="text-foreground/50 text-lg font-bold">Size:  {size}</p>
        <p className="flex gap-2 items-center text-foreground/50 text-lg font-bold">
          Brand:{" "}
          <div className=" h-[15px] ">
            <Image
              className="object-cover w-full h-full rounded-md"
              src={brandIcon}
              width={1000}
              height={1000}
              alt={`${title}`}
            />
          </div>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
