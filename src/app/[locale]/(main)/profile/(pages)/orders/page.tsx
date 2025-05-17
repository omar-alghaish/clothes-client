"use client"
import React from "react";
import Order, { IOrder } from "./_components/Order";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetOrdersQuery } from "@/redux/features/profileOrders/profileOrdersApi";


const Page = () => {
  const { data: ordersData } = useGetOrdersQuery();
  console.log(ordersData);

  const orders: IOrder[] = Array.isArray(ordersData?.data) ? ordersData.data : [];
  const [sortBy, setSortBy] = React.useState<"date-desc" | "date-asc" | "total-desc" | "total-asc">("date-desc");

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.estimatedDate).getTime() - new Date(a.estimatedDate).getTime();
      case "date-asc":
        return new Date(a.estimatedDate).getTime() - new Date(b.estimatedDate).getTime();
      case "total-desc":
        return parseFloat(b.totalPrice) - parseFloat(a.totalPrice);
      case "total-asc":
        return parseFloat(a.totalPrice) - parseFloat(b.totalPrice);
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
          <Order order={order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default Page;
