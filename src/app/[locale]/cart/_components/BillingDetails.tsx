// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import React, { useState } from "react";
// // import { Edit, Trash2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface BillingDetails {
//   id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   country: string;
//   city: string;
//   state: string;
//   streetAddress: string;
//   zipCode: string;
// }

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First name is required"),
//   lastName: Yup.string().required("Last name is required"),
//   phone: Yup.string()
//     .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number")
//     .required("Phone is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   country: Yup.string().required("Country is required"),
//   city: Yup.string().required("City is required"),
//   state: Yup.string().required("State is required"),
//   streetAddress: Yup.string().required("Street address is required"),
//   zipCode: Yup.string().required("Zip code is required"),
// });

// const BillingDetails = () => {
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       country: "",
//       city: "",
//       state: "",
//       streetAddress: "",
//       zipCode: "",
//     },
//     validationSchema,
//     onSubmit: (values, { resetForm }) => {},
//   });

//   return (
//     <div className=" space-y-8">
//       <h1 className="font-extrabold text-3xl">Biling Details</h1>
//       {/* Add Address Form */}

//       <form onSubmit={formik.handleSubmit} className="space-y-6">
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col lg:flex-row gap-6 ">
//             {/* First Name */}
//             <div className="space-y-2 flex-1">
//               <Label>First Name</Label>
//               <Input
//                 name="firstName"
//                 placeholder="Ex. Sora"
//                 value={formik.values.firstName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.firstName && formik.errors.firstName && (
//                 <p className="text-red-500 text-sm">
//                   {formik.errors.firstName}
//                 </p>
//               )}
//             </div>

//             {/* Last Name */}
//             <div className="space-y-2 flex-1">
//               <Label>Last Name</Label>
//               <Input
//                 name="lastName"
//                 placeholder="Ex. Salah"
//                 value={formik.values.lastName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.lastName && formik.errors.lastName && (
//                 <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
//               )}
//             </div>
//           </div>

//           {/* Phone */}
//           <div className="space-y-2">
//             <Label>Phone</Label>
//             <Input
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={formik.values.phone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.phone && formik.errors.phone && (
//               <p className="text-red-500 text-sm">{formik.errors.phone}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input
//               name="email"
//               type="email"
//               placeholder="Enter Email Address"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-sm">{formik.errors.email}</p>
//             )}
//           </div>

//           {/* Country */}
//           <div className="space-y-2">
//             <Label>Country</Label>
//             <Select
//               name="country"
//               value={formik.values.country}
//               onValueChange={(value) => formik.setFieldValue("country", value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Country" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="US">United States</SelectItem>
//                 <SelectItem value="CA">Canada</SelectItem>
//                 <SelectItem value="UK">United Kingdom</SelectItem>
//               </SelectContent>
//             </Select>
//             {formik.touched.country && formik.errors.country && (
//               <p className="text-red-500 text-sm">{formik.errors.country}</p>
//             )}
//           </div>

//           {/* City */}
//           <div className="space-y-2">
//             <Label>City</Label>
//             <Select
//               name="city"
//               value={formik.values.city}
//               onValueChange={(value) => formik.setFieldValue("city", value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select City" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="New York">New York</SelectItem>
//                 <SelectItem value="Los Angeles">Los Angeles</SelectItem>
//                 <SelectItem value="Chicago">Chicago</SelectItem>
//               </SelectContent>
//             </Select>
//             {formik.touched.city && formik.errors.city && (
//               <p className="text-red-500 text-sm">{formik.errors.city}</p>
//             )}
//           </div>

//           {/* State */}
//           <div className="space-y-2">
//             <Label>State</Label>
//             <Select
//               name="state"
//               value={formik.values.state}
//               onValueChange={(value) => formik.setFieldValue("state", value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select State" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="NY">New York</SelectItem>
//                 <SelectItem value="CA">California</SelectItem>
//                 <SelectItem value="TX">Texas</SelectItem>
//               </SelectContent>
//             </Select>
//             {formik.touched.state && formik.errors.state && (
//               <p className="text-red-500 text-sm">{formik.errors.state}</p>
//             )}
//           </div>

//           {/* Zip Code */}
//           <div className="space-y-2">
//             <Label>Zip Code</Label>
//             <Input
//               name="zipCode"
//               placeholder="Enter Zip Code"
//               value={formik.values.zipCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.zipCode && formik.errors.zipCode && (
//               <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
//             )}
//           </div>
//         </div>

//         {/* Street Address */}
//         <div className="space-y-2">
//           <Label>Street Address</Label>
//           <Input
//             name="streetAddress"
//             placeholder="Enter Street Address"
//             value={formik.values.streetAddress}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.streetAddress && formik.errors.streetAddress && (
//             <p className="text-red-500 text-sm">
//               {formik.errors.streetAddress}
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BillingDetails;



"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { saveBilling } from "@/redux/features/cartSlice";
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

const BillingDetails = () => {
  const dispatch = useAppDispatch();

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
    onSubmit: (values) => {
      dispatch(saveBilling(values));
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-3xl">Billing Details</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-2 flex-1">
              <Label>First Name</Label>
              <Input
                name="firstName"
                placeholder="Ex. John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <Label>Last Name</Label>
              <Input
                name="lastName"
                placeholder="Ex. Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              name="phone"
              placeholder="+1 234 567 890"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select
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

          <div className="space-y-2">
            <Label>City</Label>
            <Select
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

          <div className="space-y-2">
            <Label>State</Label>
            <Select
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

          <div className="space-y-2">
            <Label>Zip Code</Label>
            <Input
              name="zipCode"
              placeholder="12345"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Street Address</Label>
            <Input
              name="streetAddress"
              placeholder="123 Main St"
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <p className="text-red-500 text-sm">{formik.errors.streetAddress}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Save Billing Details
        </Button>
      </form>
    </div>
  );
};

export default BillingDetails;