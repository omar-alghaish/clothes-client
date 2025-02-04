"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";
import google from "../../../../../../../assets/icons/google.png"
import visa from "../../../../../../../assets/icons/visa.png"
import paypal from "../../../../../../../assets/icons/paypal.png"
import masterCard from "../../../../../../../assets/icons/master card.png"
interface IPayment {
  type: "google-pay" | "mastercard" | "visa" | "paypal";
  cardNumber?: string;
}

// Payment icons mapping
const paymentIcons: Record<IPayment["type"], string> = {
  "google-pay": google.src,
  mastercard: masterCard.src,
  visa: visa.src,
  paypal: paypal.src,
};

const Payment: FC<IPayment> = ({ type, cardNumber }) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Image src={paymentIcons[type]} alt={type} width={40} height={24} />
        <h1 className="capitalize">{type.replace("-", " ")}</h1>
        {cardNumber}
      </div>
      <div>
        {cardNumber ? (
          <Button variant="link" className="text-destructive">
            Delete
          </Button>
        ) : (
          <Button variant="link">Link Account</Button>
        )}
      </div>
    </div>
  );
};

export default Payment;
