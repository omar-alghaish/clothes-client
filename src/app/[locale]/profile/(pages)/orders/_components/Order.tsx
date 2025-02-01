import React, { FC } from "react";
import OrderItem, { IOrderItem } from "./OrderItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import background from "../../../../../../assets/backgrounds/b5.jpg";

export interface IOrder {
  id: string;
  method: string;
  total: string;
  date: string;
  items: IOrderItem[];
}
export interface IOrderProps {
  order: IOrder;
}
const Order: FC<IOrderProps> = ({ order }) => {
  return (
    <div className="border rounded-md ">
      <div className="relative">
        <div className="w-full h-[150px]">
          <Image
            src={background.src}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            alt="backgroudn"
          />
        </div>
        <div className="top-1/2  transform translate-y-[-50%]  absolute flex flex-wrap justify-between w-full px-4 lg:px-14">
          <div>
            <p className="text-gray-600 text-xl">Order ID</p>
            <h1 className="text-2xl font-extrabold">{order.id}</h1>
          </div>
          <div>
            <p className="text-gray-600 text-xl">Order ID</p>
            <h1 className="text-2xl font-extrabold">{order.id}</h1>
          </div>
          <div>
            <p className="text-gray-600 text-xl">Order ID</p>
            <h1 className="text-2xl font-extrabold">{order.id}</h1>
          </div>
          <div>
            <p className="text-gray-600 text-xl">Order ID</p>
            <h1 className="text-2xl font-extrabold">{order.id}</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {order.items.map((item, index) => (
          <div className="space-y-6" key={index}>
            <OrderItem
              img={item.img}
              title={item.title}
              color={item.color}
              size={item.size}
              brandIcon={item.brandIcon}
            />
            <Separator />
          </div>
        ))}
        <div className="flex justify-between">
          <Button>Track order</Button>
          <Button variant="link" className="text-destructive">
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
