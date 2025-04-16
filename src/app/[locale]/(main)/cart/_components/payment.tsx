"use client";
import Image from "next/image";
import React, { FC } from "react";
import google from "../../../../../assets/icons/google.png";
import visa from "../../../../../assets/icons/visa.png";
import paypal from "../../../../../assets/icons/paypal.png";
import masterCard from "../../../../../assets/icons/master card.png";

interface IPayment {
  type?: "google-pay" | "mastercard" | "visa" | "paypal" | "credit-card";
  cardNumber?: string;
}

const paymentIcons: Record<Required<IPayment>["type"], string> = {
  "google-pay": google.src,
  "mastercard": masterCard.src,
  "visa": visa.src,
  "paypal": paypal.src,
  "credit-card": visa.src,
};

const getCardType = (cardNumber: string): IPayment["type"] => {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  // Visa (length 16 or 19)
  if (/^4\d{3}[\s]?\d{4}[\s]?\d{4}[\s]?(\d{4})?$/.test(cardNumber)) {
    return 'visa';
  }
  
  // MasterCard
  if (/^5[1-5]\d{2}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}$/.test(cardNumber)) {
    return 'mastercard';
  }
  
  // American Express (not in our types, fallback to credit-card)
  if (/^3[47]\d{1,2}[\s]?\d{6}[\s]?\d{5}$/.test(cardNumber)) {
    return 'credit-card';
  }
  
  // Discover
  if (/^6(?:011|5\d{2}|4[4-9]\d)\d{1,}/.test(cleaned)) {
    return 'credit-card';
  }
  
  return 'credit-card';
};

const Payment: FC<IPayment> = ({ type, cardNumber }) => {
  const detectedType = type || (cardNumber ? getCardType(cardNumber) : 'credit-card');
  const displayNumber = cardNumber?.replace(/(\d{4}) /g, (_, p1) => `${p1} `);

  return (
    <div className="flex items-center gap-4 w-full">
      <Image 
        src={paymentIcons[detectedType as keyof typeof paymentIcons]} 
        alt={detectedType || 'payment method'} 
        width={40} 
        height={24} 
        className="w-12 h-8 object-contain"
      />
      <div>
        <h2 className="capitalize font-medium">
          {(detectedType || "").replace("-", " ")}
        </h2>
        {cardNumber && (
          <span className="text-muted-foreground">
            {displayNumber?.slice(-8).replace(/(\d{4}) /g, '**** ')}
          </span>
        )}
      </div>
    </div>
  );
};

export default Payment;