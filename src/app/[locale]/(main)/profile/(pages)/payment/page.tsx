"use client";
import React from "react";
import Payment from "./_components/payment";
import AddCard from "./_components/AddCard";
import { useGetPaymentQuery } from "@/redux/features/payment/paymentApi";
import { Toaster } from "sonner";

interface PaymentData {
  _id: string;
  cardType: string;
  cardNumber: string;
}

interface PaymentResponse {
  status?: string;
  data: {
    data: { paymentCards?: PaymentData[] };
  };
  [key: string]: unknown;
}

const Page = () => {
  const { data: paymentCards, isLoading, isError } = useGetPaymentQuery<PaymentResponse>();
  const cards = paymentCards?.data?.paymentCards ?? [];

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-4 text-center">Loading payment methods...</div>
        ) : isError ? (
          <div className="p-4 text-center text-red-500">
            Failed to load payment methods
          </div>
        ) : cards.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            You have no saved payment methods.
          </div>
        ) : (
          cards.map((card: PaymentData) => (
            <Payment
              key={card._id}
              cardType={card.cardType}
              cardNumber={card.cardNumber ? card.cardNumber.replace(/\d(?=\d{4})/g, "*") : ""}
              _id={card._id}
            />
          ))
        )}
      </div>
      <AddCard />
    </div>
  );
}

export default Page;
