"use client";
import Image from "next/image";
import React, { FC } from "react";
import google from "../../../../../assets/icons/google.png";
import visa from "../../../../../assets/icons/visa.png";
import paypal from "../../../../../assets/icons/paypal.png";
import masterCard from "../../../../../assets/icons/master card.png";

interface IPayment {
  type?: "google-pay" | "mastercard" | "visa" | "paypal" | "cash";
  cardNumber?: string;
  methodName?: string;
  onTypeDetected?: (type: string) => void;
}

const paymentIcons: Record<string, string> = {
  "google-pay": google.src,
  "mastercard": masterCard.src,
  "visa": visa.src,
  "paypal": paypal.src,
};

const getCardType = (cardNumber: string): IPayment["type"] => {
  // Remove all non-digit characters for pattern matching
  const cleaned = cardNumber.replace(/\D/g, '');
  
  // Visa - starts with 4
  if (/^4/.test(cleaned)) {
    return 'visa';
  }
  
  // MasterCard - starts with 51-55 or 2221-2720
  if ((/^5[1-5]/.test(cleaned)) || (/^2[2-7][2-9][0-9]/.test(cleaned))) {
    return 'mastercard';
  }
  
return 'visa'
};

const Payment: FC<IPayment> = ({ type, cardNumber, onTypeDetected }) => {
  // First use explicitly provided type, then detect from card number
  const detectedType = type || (cardNumber ? getCardType(cardNumber) : 'credit-card');
  
  // Call onTypeDetected when type is detected
  React.useEffect(() => {
    if (onTypeDetected && detectedType) {
      onTypeDetected(detectedType);
    }
  }, [detectedType]);

  // Format display number correctly
  const displayNumber = cardNumber ? 
    `**** **** **** ${cardNumber.replace(/\D/g, '').slice(-4)}` : 
    undefined;

  return (
    <div className="flex items-center gap-4 w-full">
      <Image 
        src={paymentIcons[detectedType as string] || paymentIcons["credit-card"]}
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
            {displayNumber}
          </span>
        )}
      </div>
    </div>
  );
};

export default Payment;