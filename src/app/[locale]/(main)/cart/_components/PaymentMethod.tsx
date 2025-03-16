"use client";
import React, { useState } from "react";
import Payment from "./payment";
import AddCard from "./AddCard";
import { useAppSelector, useAppDispatch } from "@/redux/store/hooks";
import { addPaymentMethod, selectPaymentMethods } from "@/redux/features/cartSlice";

type PaymentType = "credit-card" | "google-pay" | "mastercard" | "visa" | "paypal";

interface CardValues {
  cardNumber: string;
  holderName: string;
  expireDate: string;
  cvv: string;
}

const PaymentMethod = () => {
  const dispatch = useAppDispatch();
  const paymentMethods = useAppSelector(selectPaymentMethods);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [showAddCard, setShowAddCard] = useState(false);

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayment(paymentId);
    setShowAddCard(false); // Close add card form when selecting existing payment
  };

  const handleAddNewPaymentSelection = () => {
    setSelectedPayment(""); // Clear selected payment
    setShowAddCard(true);
  };

  const handleAddCard = (values: CardValues) => {
    const maskedCard = values.cardNumber.replace(/.(?=.{4})/g, '*');
    const newPayment = {
      id: `card-${Date.now()}`,
      type: 'credit-card' as PaymentType,
      details: {
        holderName: values.holderName,
        expireDate: values.expireDate,
        cvv: values.cvv
      },
      cardNumber: maskedCard
    };
    dispatch(addPaymentMethod(newPayment));
    setSelectedPayment(newPayment.id);
    setShowAddCard(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div
            key={payment.id}
            className={`border rounded-lg p-4 ${selectedPayment === payment.id ? 'border-primary' : ''}`}
          >
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={payment.id}
                checked={selectedPayment === payment.id}
                onChange={() => handlePaymentSelection(payment.id)}
                className="h-5 w-5 text-primary focus:ring-primary"
                aria-labelledby={`label-${payment.id}`}
              />
              <span id={`label-${payment.id}`} className="sr-only">
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
      {/* <Button
        className="w-full"
        disabled={!selectedPayment && !showAddCard}
      >
        Continue to Review
      </Button> */}
    </div>
  );
};

export default PaymentMethod;
