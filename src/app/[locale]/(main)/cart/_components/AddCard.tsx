"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPaymentCard } from "@/redux/features/user/userApi";
import { useFormik } from "formik";
import { CreditCard } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  cardHolderName: Yup.string().required("Card holder name is required"),
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number format"),
  expirationDate: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY format required"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

const AddCard = ({ onSubmit }: { onSubmit: (values: Omit<IPaymentCard, "_id">) => void }) => {
  const formik = useFormik<Omit<IPaymentCard, "_id">>({
    initialValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || '';
  };

  const formatExpireDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d{0,2})/, '$1/$2')
      .substring(0, 5);
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-6 h-6" />
        <h1 className="text-xl font-semibold">Add Payment Method</h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Card Holder Name *</Label>
          <Input
            name="cardHolderName"
            placeholder="John Doe"
            value={formik.values.cardHolderName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cardHolderName && formik.errors.cardHolderName && (
            <p className="text-red-500 text-sm">{formik.errors.cardHolderName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Card Number *</Label>
          <Input
            name="cardNumber"
            placeholder="4242 4242 4242 4242"
            value={formik.values.cardNumber}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              formik.setFieldValue("cardNumber", formatted);
            }}
            onBlur={formik.handleBlur}
            maxLength={19}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <p className="text-red-500 text-sm">{formik.errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expiration Date (MM/YY) *</Label>
            <Input
              name="expirationDate"
              placeholder="MM/YY"
              value={formik.values.expirationDate}
              onChange={(e) => {
                const formatted = formatExpireDate(e.target.value);
                formik.setFieldValue("expirationDate", formatted);
              }}
              onBlur={formik.handleBlur}
              maxLength={5}
            />
            {formik.touched.expirationDate && formik.errors.expirationDate && (
              <p className="text-red-500 text-sm">{formik.errors.expirationDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>CVV *</Label>
            <Input
              name="cvv"
              placeholder="123"
              value={formik.values.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                formik.setFieldValue("cvv", value.substring(0, 4));
              }}
              onBlur={formik.handleBlur}
              maxLength={4}
            />
            {formik.touched.cvv && formik.errors.cvv && (
              <p className="text-red-500 text-sm">{formik.errors.cvv}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Add Payment Method
        </Button>
      </form>
    </div>
  );
};

export default AddCard;
