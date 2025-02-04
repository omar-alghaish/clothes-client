"use client";
import React from "react";
import Payment from "./_components/payment";
import AddCard from "./_components/AddCard";

type PaymentType = "google-pay" | "mastercard" | "visa" | "paypal";

const payments: { cardnumber: string; type: PaymentType }[] = [
  {
    cardnumber: "35*********323",
    type: "visa",
  },
  {
    cardnumber: "35*********323",
    type: "mastercard",
  },
];

const page = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4"> 
        <Payment type={"google-pay"} />
        <Payment type={"paypal"} />
        {payments.map((item, index) => (
          <Payment key={index} type={item.type} cardNumber={item.cardnumber} />
        ))}
      </div>
      <AddCard />
    </div>
  );
};

export default page;
