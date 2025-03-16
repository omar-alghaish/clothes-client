import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  streetAddress: Yup.string().required("Street address is required"),
  zipCode: Yup.string().required("Zip code is required"),
});

interface AddressFormProps {
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    state: string;
    streetAddress: string;
    zipCode: string;
  }) => void;
  initialValues?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    state: string;
    streetAddress: string;
    zipCode: string;
  };
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      state: "",
      streetAddress: "",
      zipCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="Ex. John"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />

          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Ex. Doe"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>

        <FormField
          label="Phone"
          name="phone"
          placeholder="+1 234 567 890"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && formik.errors.phone}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <FormSelect
          label="Country"
          name="country"
          placeholder="Select Country"
          value={formik.values.country}
          onChange={(value: string) => formik.setFieldValue("country", value)}
          error={formik.touched.country && formik.errors.country}
          options={[
            { value: "US", label: "United States" },
            { value: "CA", label: "Canada" },
            { value: "UK", label: "United Kingdom" },
          ]}
        />

        <FormSelect
          label="City"
          name="city"
          placeholder="Select City"
          value={formik.values.city}
          onChange={(value: string) => formik.setFieldValue("city", value)}
          error={formik.touched.city && formik.errors.city}
          options={[
            { value: "New York", label: "New York" },
            { value: "Los Angeles", label: "Los Angeles" },
            { value: "Chicago", label: "Chicago" },
          ]}
        />

        <FormSelect
          label="State"
          name="state"
          placeholder="Select State"
          value={formik.values.state}
          onChange={(value: string) => formik.setFieldValue("state", value)}
          error={formik.touched.state && formik.errors.state}
          options={[
            { value: "NY", label: "New York" },
            { value: "CA", label: "California" },
            { value: "TX", label: "Texas" },
          ]}
        />

        <FormField
          label="Zip Code"
          name="zipCode"
          placeholder="12345"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zipCode && formik.errors.zipCode}
        />

        <FormField
          label="Street Address"
          name="streetAddress"
          placeholder="123 Main St"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.streetAddress && formik.errors.streetAddress}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        Save Address
      </Button>
    </form>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", placeholder, value, onChange, onBlur, error }) => {
  return (
    <div className="space-y-2 flex-1">
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

interface FormSelectProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | boolean;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, placeholder, value, onChange, error, options }) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AddressForm;