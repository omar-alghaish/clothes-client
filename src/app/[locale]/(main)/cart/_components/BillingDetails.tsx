// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import React from "react";
// import { useAppDispatch } from "@/redux/store/hooks";
// import { saveBilling } from "@/redux/features/cartSlice";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

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
//   const dispatch = useAppDispatch();

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
//     onSubmit: (values) => {
//       dispatch(saveBilling(values));
//     },
//   });

//   return (
//     <div className="space-y-8">
//       <h1 className="font-extrabold text-3xl">Billing Details</h1>
//       <form onSubmit={formik.handleSubmit} className="space-y-6">
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col lg:flex-row gap-6">
//             <div className="space-y-2 flex-1">
//               <Label>First Name</Label>
//               <Input
//                 name="firstName"
//                 placeholder="Ex. John"
//                 value={formik.values.firstName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.firstName && formik.errors.firstName && (
//                 <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
//               )}
//             </div>

//             <div className="space-y-2 flex-1">
//               <Label>Last Name</Label>
//               <Input
//                 name="lastName"
//                 placeholder="Ex. Doe"
//                 value={formik.values.lastName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.lastName && formik.errors.lastName && (
//                 <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Phone</Label>
//             <Input
//               name="phone"
//               placeholder="+1 234 567 890"
//               value={formik.values.phone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.phone && formik.errors.phone && (
//               <p className="text-red-500 text-sm">{formik.errors.phone}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label>Email</Label>
//             <Input
//               name="email"
//               type="email"
//               placeholder="john@example.com"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-sm">{formik.errors.email}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label>Country</Label>
//             <Select
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

//           <div className="space-y-2">
//             <Label>City</Label>
//             <Select
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

//           <div className="space-y-2">
//             <Label>State</Label>
//             <Select
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

//           <div className="space-y-2">
//             <Label>Zip Code</Label>
//             <Input
//               name="zipCode"
//               placeholder="12345"
//               value={formik.values.zipCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.zipCode && formik.errors.zipCode && (
//               <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label>Street Address</Label>
//             <Input
//               name="streetAddress"
//               placeholder="123 Main St"
//               value={formik.values.streetAddress}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.touched.streetAddress && formik.errors.streetAddress && (
//               <p className="text-red-500 text-sm">{formik.errors.streetAddress}</p>
//             )}
//           </div>
//         </div>

//         <Button 
//           type="submit" 
//           className="w-full"
//           disabled={!formik.isValid || formik.isSubmitting}
//         >
//           Save Billing Details
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default BillingDetails;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AddressForm from "./AddressForm";
import SavedAddressCard from "./AddressCard";

// Fake address data
const fakeAddresses = [
  {
    id: "address-1",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 234 567 8901",
    email: "john.doe@example.com",
    country: "US",
    city: "New York",
    state: "NY",
    streetAddress: "123 Broadway St",
    zipCode: "10001"
  },
  {
    id: "address-2",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 987 654 3210",
    email: "jane.smith@example.com",
    country: "US",
    city: "Los Angeles",
    state: "CA",
    streetAddress: "456 Hollywood Blvd",
    zipCode: "90028"
  }
];

const BillingDetails = () => {
  const [savedAddresses, setSavedAddresses] = useState(fakeAddresses);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [, setBillingAddress] = useState<{
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
  } | null>(null);

  // Initialize the first address as selected if addresses exist
  useEffect(() => {
    if (savedAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(savedAddresses[0].id);
    }
  }, []);

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId);
    setShowAddAddress(false);
  };

  const handleAddNewAddressSelection = () => {
    setSelectedAddress("");
    setShowAddAddress(true);
  };

  const handleAddressSubmit = (values: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    state: string;
    streetAddress: string;
    zipCode: string;
  }) => {
    const newAddress = {
      id: `address-${Date.now()}`,
      ...values
    };
    
    // Add to saved addresses
    setSavedAddresses([...savedAddresses, newAddress]);
    
    // Select the new address
    setSelectedAddress(newAddress.id);
    setShowAddAddress(false);
    
    // Set as billing address
    setBillingAddress(newAddress);
  };

  const handleContinue = () => {
    // Set the selected address as the billing address
    if (selectedAddress) {
      const address = savedAddresses.find(addr => addr.id === selectedAddress);
      if (address) {
        setBillingAddress(address);
        alert(`Selected billing address: ${address.firstName} ${address.lastName}, ${address.streetAddress}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-3xl">Billing Details</h1>
      <div className="space-y-6">
        {savedAddresses.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Saved Addresses</h2>
            
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 ${selectedAddress === address.id ? 'border-primary' : ''}`}
              >
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="billingAddress"
                    value={address.id}
                    checked={selectedAddress === address.id}
                    onChange={() => handleAddressSelection(address.id)}
                    className="h-5 w-5 text-primary focus:ring-primary"
                  />
                  <SavedAddressCard address={address} />
                </label>
              </div>
            ))}

            <div className={`border rounded-lg p-4 ${showAddAddress ? 'border-primary' : ''}`}>
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="billingAddress"
                  value="new"
                  checked={showAddAddress}
                  onChange={() => handleAddNewAddressSelection()}
                  className="h-5 w-5 text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Add new address</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {showAddAddress && (
          <div className="mt-4">
            <AddressForm onSubmit={handleAddressSubmit} />
          </div>
        )}

        {!showAddAddress && savedAddresses.length > 0 && (
          <Button 
            className="w-full"
            onClick={handleContinue}
            disabled={!selectedAddress}
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingDetails;