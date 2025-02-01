import React from "react";
import Order, { IOrder } from "./_components/Order";
import img from "../../../../../assets/images/i16.jpg";
import brandIcon from "../../../../../assets/brandIcons/hm.png";
const orders: IOrder[] = [
  {
    id: "string",
    method: "string",
    total: "string",
    date: "string",
    items: [
      {
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },
      {
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },{
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },
    ],
  },
  {
    id: "string",
    method: "string",
    total: "string",
    date: "string",
    items: [
      {
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },
      {
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },{
        img: img.src,
        title: "string",
        color: "string",
        size: "string",
        brandIcon: brandIcon.src,
      },
    ],
  },
];
const page = () => {
  return (
    <div className="space-y-6">
      {orders.map((item, index) => (
        <Order order={item} key={index} />
      ))}
    </div>
  );
};

export default page;
