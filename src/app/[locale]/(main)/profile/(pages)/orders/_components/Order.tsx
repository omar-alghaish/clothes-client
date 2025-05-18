'use client';

import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { toast, Toaster } from 'sonner';

import OrderItem, { ItemData } from './OrderItem';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import background from '../../../../../../../assets/backgrounds/b5.jpg';
import { useCancelOrderMutation } from '@/redux/features/profileOrders/statusApi';
import Link from 'next/link';

export interface IOrder {
  _id: string;
  paymentMethod: string;
  totalPrice: string;
  estimatedDate: string;
  status: string;
  items: ItemData[];
}

export interface IOrderProps {
  order: IOrder;
}

const Order: FC<IOrderProps> = ({ order }) => {
  const [cancelOrder, { isLoading, isSuccess }] = useCancelOrderMutation();
  const [isCancelled, setIsCancelled] = useState(
    order.status?.toLowerCase() === 'cancelled'
  );
  console.log(order);
  
  useEffect(() => {
    if (isSuccess) {
      setIsCancelled(true);
    }
  }, [isSuccess]);

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(order._id).unwrap();
    } catch (error) {
      console.error('Failed to cancel order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const statusTextColor = order?.status?.toLowerCase() === 'cancelled' ? 'text-red-500' : '';
  
  // Function to safely get payment method as string
  const getPaymentMethodString = (paymentMethod: string) => {
    if (!paymentMethod) return "cash";
    if (typeof paymentMethod === 'string') return paymentMethod;
    if (typeof paymentMethod === 'object') {
      // If it's an object with methodName property, return that
      return "Unknown method";
    }
    return "cash";
  };

  return (
    <>
      <Toaster />
      <div className="border rounded-md">
        <div className="relative">
          <div className="w-full h-[300px] md:h-[150px]">
            <Image
              src={background.src}
              alt="background"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-wrap justify-between w-full px-4 lg:px-14 gap-4">
            {[
              { label: 'Order ID', value: order?._id ? order._id.slice(0, 6) : 'N/A' },
              { 
                label: 'Payment Method', 
                value: getPaymentMethodString(order?.paymentMethod)
              },
              { label: 'Total Payment', value: order?.totalPrice || 'N/A' },
              { 
                label: 'Estimated Delivery Date', 
                value: order?.estimatedDate ? order.estimatedDate.slice(0, 10) : 'N/A' 
              },
              {
                label: 'Status',
                value: order?.status || 'N/A',
                className: statusTextColor,
              },
            ].map((item, index) => (
              <div key={index} className="min-w-[150px]">
                <p className="text-gray-600 text-xl">{item.label}</p>
                <h1 className={`text-lg font-extrabold ${item.className || ''}`}>
                  {item.value}
                </h1>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-6 p-6">
          {order?.items?.map((item) => (
            <div key={item._id} className="space-y-6">
              <OrderItem {...item} />
              <Separator />
            </div>
          ))}
          
          <div className="flex justify-between">
            <Button>
              <Link href={`/profile/orders/${order?._id}`}>Track order</Link>
            </Button>
            <Button
              variant="link"
              className="text-destructive"
              onClick={handleCancelOrder}
              disabled={isLoading || isCancelled}
            >
              {isLoading
                ? 'Cancelling...'
                : isCancelled
                  ? 'Order Cancelled'
                  : 'Cancel Order'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;