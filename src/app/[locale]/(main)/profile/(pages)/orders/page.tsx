"use client"
import React from "react";
import Order, { IOrder } from "./_components/Order";
import img from "../../../../../../assets/images/i16.jpg";
import brandIcon from "../../../../../../assets/brandIcons/hm.png";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const orders: IOrder[] = [
  {
    id: "ORD-001",
    method: "Credit Card",
    total: "150.00",
    date: "2024-03-15",
    items: [
      {
        img: img.src,
        title: "Summer Dress",
        color: "Red",
        size: "M",
        brandIcon: brandIcon.src,
      },
      {
        img: img.src,
        title: "Denim Jacket",
        color: "Blue",
        size: "L",
        brandIcon: brandIcon.src,
      },
    ],
  },
  {
    id: "ORD-002",
    method: "PayPal",
    total: "89.99",
    date: "2024-03-10",
    items: [
      {
        img: img.src,
        title: "Slim Fit Jeans",
        color: "Black",
        size: "32",
        brandIcon: brandIcon.src,
      },
    ],
  },
  {
    id: "ORD-003",
    method: "Apple Pay",
    total: "210.50",
    date: "2024-03-18",
    items: [
      {
        img: img.src,
        title: "Winter Coat",
        color: "Navy",
        size: "XL",
        brandIcon: brandIcon.src,
      },
      {
        img: img.src,
        title: "Wool Scarf",
        color: "Gray",
        size: "One Size",
        brandIcon: brandIcon.src,
      },
    ],
  },
];

const Page = () => {
  const [sortBy, setSortBy] = React.useState<"date-desc" | "date-asc" | "total-desc" | "total-asc">("date-desc");

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "total-desc":
        return parseFloat(b.total) - parseFloat(a.total);
      case "total-asc":
        return parseFloat(a.total) - parseFloat(b.total);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-extrabold">Orders ({orders.length})</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: "date-desc" | "date-asc" | "total-desc" | "total-asc") => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date: Newest First</SelectItem>
              <SelectItem value="date-asc">Date: Oldest First</SelectItem>
              <SelectItem value="total-desc">Total: High to Low</SelectItem>
              <SelectItem value="total-asc">Total: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {sortedOrders.map((order) => (
          <Order order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export default Page;
