"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";
import { FormikProps } from "formik";
import { Separator } from "@/components/ui/separator";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar:string
}

interface IInputsContainer {
  formik: FormikProps<FormValues>;
}

const InputsContainer: FC<IInputsContainer> = ({ formik }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* First Name */}
        <div className="space-y-2 flex-1">
          <Label>First Name *</Label>
          <Input
            name="firstName"
            placeholder="Ex. Sora"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2 flex-1">
          <Label>Last Name *</Label>
          <Input
            name="lastName"
            placeholder="Ex. Salah"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>
      </div>
      <Separator />
      {/* Email */}
      <div className="space-y-2">
        <Label>Email *</Label>
        <Input
          name="email"
          type="email"
          placeholder="Enter Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>
      <Separator />
      {/* Phone */}
      <div className="space-y-2">
        <Label>Phone *</Label>
        <Input
          name="phone"
          placeholder="Enter Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}
      </div>
    </div>
  );
};

export default InputsContainer;
