"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";
import google from "../../../../../../../assets/icons/google.png";
import visa from "../../../../../../../assets/icons/visa.png";
import paypal from "../../../../../../../assets/icons/paypal.png";
import masterCard from "../../../../../../../assets/icons/master card.png";
import { useDeletePaymentMutation } from "@/redux/features/payment/paymentApi";
import { toast } from "sonner";

interface PaymentData {
  _id: string;
  cardType: string;
  cardNumber: string;
}
  
// Payment icons mapping with static imports
import { StaticImageData } from "next/image";

const paymentIcons: Record<string, StaticImageData> = {
  "google-pay": google,
  "mastercard": masterCard,
  "visa": visa,
  "paypal": paypal,
};

const Payment: FC<PaymentData> = ({ cardType, cardNumber, _id }) => {
  const [deletePayment, { isLoading }] = useDeletePaymentMutation();

  const handleDelete = async () => {
    if (!_id) return;

    try {
      await deletePayment(_id).unwrap();
      toast.success("Payment method deleted successfully");
    } catch (error :unknown) {
      console.log(error)
      toast.error("Failed to delete payment method");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          src={paymentIcons[cardType] || google} // Fallback to google icon if not found
          alt={cardType || "payment method"}
          width={40}
          height={24}
        />
        <h1 className="capitalize">
          {(cardType || "").replace("-", " ")}
        </h1>
        {cardNumber && <span className="ml-2">{cardNumber}</span>}
      </div>
      <div>
        {cardNumber ? (
          <Button
            variant="link"
            className="text-destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        ) : (
          <Button variant="link">Link Account</Button>
        )}
      </div>
    </div>
  );
};

export default Payment;
