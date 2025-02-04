// "use client"
// import Image from "next/image";
// import React, { FC } from "react";
// import google from "../../../../assets/icons/google.png"
// import visa from "../../../../assets/icons/visa.png"
// import paypal from "../../../../assets/icons/paypal.png"
// import masterCard from "../../../../assets/icons/master card.png"
// interface IPayment {
//   type: "google-pay" | "mastercard" | "visa" | "paypal";
//   cardNumber?: string;
// }

// // Payment icons mapping
// const paymentIcons: Record<IPayment["type"], string> = {
//   "google-pay": google.src,
//   mastercard: masterCard.src,
//   visa: visa.src,
//   paypal: paypal.src,
// };

// const Payment: FC<IPayment> = ({ type, cardNumber }) => {
//   return (
//     <div className="flex justify-between items-center p-4 border rounded-lg">
//       <div className="flex items-center gap-2">
//         <Image src={paymentIcons[type]} alt={type} width={40} height={24} />
//         <h1 className="capitalize">{type.replace("-", " ")}</h1>
//         {cardNumber}
//       </div>
//     </div>
//   );
// };

// export default Payment;



"use client"
import Image from "next/image";
import React, { FC } from "react";
import google from "../../../../../assets/icons/google.png";
import visa from "../../../../../assets/icons/visa.png";
import paypal from "../../../../../assets/icons/paypal.png";
import masterCard from "../../../../../assets/icons/master card.png";

interface IPayment {
  type: "google-pay" | "mastercard" | "visa" | "paypal" | "credit-card";
  cardNumber?: string;
}

const paymentIcons: Record<IPayment["type"], string> = {
  "google-pay": google.src,
  mastercard: masterCard.src,
  visa: visa.src,
  paypal: paypal.src,
  "credit-card": visa.src, // default for credit cards
};

const Payment: FC<IPayment> = ({ type, cardNumber }) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <Image 
        src={paymentIcons[type]} 
        alt={type} 
        width={40} 
        height={24} 
        className="w-12 h-8 object-contain"
      />
      <div>
        <h2 className="capitalize font-medium">{type.replace("-", " ")}</h2>
        {cardNumber && <span className="text-muted-foreground">{cardNumber}</span>}
      </div>
    </div>
  );
};

export default Payment;