"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
// import { Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  state: string;
  streetAddress: string;
  zipCode: string;
}

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

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      firstName: "Tamer",
      lastName: "Dlab",
      phone: "+1234567890",
      email: "tamer@example.com",
      country: "US",
      city: "New York",
      state: "NY",
      streetAddress: "123 Main St",
      zipCode: "10001",
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
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
    onSubmit: (values, { resetForm }) => {
      if (editingId) {
        setAddresses((prev) =>
          prev.map((address) =>
            address.id === editingId ? { ...values, id: editingId } : address
          )
        );
      } else {
        setAddresses((prev) => [
          ...prev,
          { ...values, id: Date.now().toString() },
        ]);
      }
      setEditingId(null);
      resetForm();
    },
  });

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    formik.setValues(address);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  return (
    <div className=" space-y-8">
      <h1 className="text-2xl font-bold">Saved Addresses</h1>

      {/* Existing Addresses */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div className="space-y-2">
              <h3 className="font-medium">
                {address.firstName} {address.lastName}
              </h3>
              <p className="text-sm text-gray-600">{address.streetAddress}</p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p className="text-sm text-gray-600">{address.phone}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="link"
                size="icon"
                onClick={() => handleEdit(address)}
              >
                Edit
              </Button>
              <Button
                variant="link"
                size="icon"
                className="text-destructive"
                onClick={() => handleDelete(address.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Address Form */}
      <h2 className="text-xl font-bold pt-8 border-t">
        {editingId ? "Edit Address" : "Add New Address"}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-6">
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
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
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

          {/* Country */}
          <div className="space-y-2">
            <Label>Country *</Label>
            <Select
              name="country"
              value={formik.values.country}
              onValueChange={(value) => formik.setFieldValue("country", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm">{formik.errors.country}</p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>City *</Label>
            <Select
              name="city"
              value={formik.values.city}
              onValueChange={(value) => formik.setFieldValue("city", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm">{formik.errors.city}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label>State *</Label>
            <Select
              name="state"
              value={formik.values.state}
              onValueChange={(value) => formik.setFieldValue("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-sm">{formik.errors.state}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="space-y-2">
            <Label>Zip Code *</Label>
            <Input
              name="zipCode"
              placeholder="Enter Zip Code"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div className="space-y-2">
          <Label>Street Address *</Label>
          <Input
            name="streetAddress"
            placeholder="Enter Street Address"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.streetAddress && formik.errors.streetAddress && (
            <p className="text-red-500 text-sm">
              {formik.errors.streetAddress}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <Button type="submit" className="w-[200px]">
            {editingId ? "Update Address" : "Add Address"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setEditingId(null);
                formik.resetForm();
              }}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressPage;
