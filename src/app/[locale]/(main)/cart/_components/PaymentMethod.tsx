"use client";
import React, { useState } from "react";
import Payment from "./payment";
import AddCard from "./AddCard";
import { useAppDispatch } from "@/redux/store/hooks";
import { IPaymentCard, useGetPaymentCardsQuery } from "@/redux/features/user/userApi";

type PaymentType = "credit-card" | "google-pay" | "mastercard" | "visa" | "paypal";
type ExtendedPaymentCard = IPaymentCard & { type: PaymentType };

const PaymentMethod = () => {
  const dispatch = useAppDispatch();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [showAddCard, setShowAddCard] = useState(false);
  const { data: paymentMethods, isLoading, error } = useGetPaymentCardsQuery({});

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayment(paymentId);
    setShowAddCard(false); 
  };

  const handleAddNewPaymentSelection = () => {
    setSelectedPayment(""); // Clear selected payment
    setShowAddCard(true);
  };

  const handleAddCard = (values: Omit<IPaymentCard, "_id">) => {
    const maskedCard = values.cardNumber.replace(/.(?=.{4})/g, '*');
    const newPayment = {
      id: `card-${Date.now()}`,
      type: 'credit-card' as PaymentType,
      details: {
        holderName: values.cardHolderName,
        expirationDate: values.expirationDate,
        cvv: values.cvv
      },
      cardNumber: maskedCard
    };
    setSelectedPayment(newPayment.id);
    setShowAddCard(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paymentMethods?.map((payment: ExtendedPaymentCard) => (
          <div
            key={payment._id}
            className={`border rounded-lg p-4 ${selectedPayment === payment._id ? 'border-primary' : ''}`}
          >
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={payment._id}
                checked={selectedPayment === payment._id}
                onChange={() => handlePaymentSelection(payment._id)}
                className="h-5 w-5 text-primary focus:ring-primary"
                aria-labelledby={`label-${payment._id}`}
              />
              <span id={`label-${payment._id}`} className="sr-only">
                {`Select ${payment.type} ending in ${payment.cardNumber ? payment.cardNumber.slice(-4) : ''}`}
              </span>
              <Payment
                type={payment.type}
                cardNumber={payment.cardNumber || ''}
              />
            </label>
          </div>
        ))}

        <div className={`border rounded-lg p-4 ${showAddCard ? 'border-primary' : ''}`}>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="new"
              checked={showAddCard}
              onChange={() => handleAddNewPaymentSelection()}
              className="h-5 w-5 text-primary focus:ring-primary"
              aria-labelledby="label-new-payment"
            />
            <span id="label-new-payment" className="sr-only">Add new payment method</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Add new payment method</span>
            </div>
          </label>
        </div>
        {showAddCard && (
          <div className="mt-4">
            <AddCard onSubmit={handleAddCard} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
