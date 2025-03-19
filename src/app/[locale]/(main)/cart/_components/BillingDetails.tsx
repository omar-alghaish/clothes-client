// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import AddressForm from "./AddressForm";
// import SavedAddressCard from "./AddressCard";

// // Fake address data
// const fakeAddresses = [
//   {
//     id: "address-1",
//     firstName: "John",
//     lastName: "Doe",
//     phone: "+1 234 567 8901",
//     email: "john.doe@example.com",
//     country: "US",
//     city: "New York",
//     state: "NY",
//     streetAddress: "123 Broadway St",
//     zipCode: "10001"
//   },
//   {
//     id: "address-2",
//     firstName: "Jane",
//     lastName: "Smith",
//     phone: "+1 987 654 3210",
//     email: "jane.smith@example.com",
//     country: "US",
//     city: "Los Angeles",
//     state: "CA",
//     streetAddress: "456 Hollywood Blvd",
//     zipCode: "90028"
//   }
// ];

// const BillingDetails = () => {
//   const [savedAddresses, setSavedAddresses] = useState(fakeAddresses);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [, setBillingAddress] = useState<{
//     id: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     country: string;
//     city: string;
//     state: string;
//     streetAddress: string;
//     zipCode: string;
//   } | null>(null);

//   // Initialize the first address as selected if addresses exist
//   useEffect(() => {
//     if (savedAddresses.length > 0 && !selectedAddress) {
//       setSelectedAddress(savedAddresses[0].id);
//     }
//   }, []);

//   const handleAddressSelection = (addressId: string) => {
//     setSelectedAddress(addressId);
//     setShowAddAddress(false);
//   };

//   const handleAddNewAddressSelection = () => {
//     setSelectedAddress("");
//     setShowAddAddress(true);
//   };

//   const handleAddressSubmit = (values: {
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     country: string;
//     city: string;
//     state: string;
//     streetAddress: string;
//     zipCode: string;
//   }) => {
//     const newAddress = {
//       id: `address-${Date.now()}`,
//       ...values
//     };
    
//     // Add to saved addresses
//     setSavedAddresses([...savedAddresses, newAddress]);
    
//     // Select the new address
//     setSelectedAddress(newAddress.id);
//     setShowAddAddress(false);
    
//     // Set as billing address
//     setBillingAddress(newAddress);
//   };

//   const handleContinue = () => {
//     // Set the selected address as the billing address
//     if (selectedAddress) {
//       const address = savedAddresses.find(addr => addr.id === selectedAddress);
//       if (address) {
//         setBillingAddress(address);
//         alert(`Selected billing address: ${address.firstName} ${address.lastName}, ${address.streetAddress}`);
//       }
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <h1 className="font-extrabold text-3xl">Billing Details</h1>
//       <div className="space-y-6">
//         {savedAddresses.length > 0 && (
//           <div className="space-y-4">
//             <h2 className="font-semibold text-xl">Saved Addresses</h2>
            
//             {savedAddresses.map((address) => (
//               <div
//                 key={address.id}
//                 className={`border rounded-lg p-4 ${selectedAddress === address.id ? 'border-primary' : ''}`}
//               >
//                 <label className="flex items-center gap-4 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="billingAddress"
//                     value={address.id}
//                     checked={selectedAddress === address.id}
//                     onChange={() => handleAddressSelection(address.id)}
//                     className="h-5 w-5 text-primary focus:ring-primary"
//                   />
//                   <SavedAddressCard address={address} />
//                 </label>
//               </div>
//             ))}

//             <div className={`border rounded-lg p-4 ${showAddAddress ? 'border-primary' : ''}`}>
//               <label className="flex items-center gap-4 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="billingAddress"
//                   value="new"
//                   checked={showAddAddress}
//                   onChange={() => handleAddNewAddressSelection()}
//                   className="h-5 w-5 text-primary focus:ring-primary"
//                 />
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg font-medium">Add new address</span>
//                 </div>
//               </label>
//             </div>
//           </div>
//         )}

//         {showAddAddress && (
//           <div className="mt-4">
//             <AddressForm onSubmit={handleAddressSubmit} />
//           </div>
//         )}

//         {!showAddAddress && savedAddresses.length > 0 && (
//           <Button 
//             className="w-full"
//             onClick={handleContinue}
//             disabled={!selectedAddress}
//           >
//             Continue
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BillingDetails;



"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AddressForm from "./AddressForm";
import SavedAddressCard from "./AddressCard";
import { IAddress, useCreateAddressMutation, useDeleteAddressMutation, useGetAddressesQuery } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { selectAddressId, setAddressId } from "@/redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const BillingDetails = () => {
  const { data: addresses , isLoading, error } = useGetAddressesQuery({});
  const { order } = useSelector((state: RootState) => state);
  console.log(order)
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const dispatch = useDispatch();

  console.log(addresses)


const fakeAddresses = [
  {
    _id: "address-1",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1 234 567 8901",
    email: "john.doe@example.com",
    country: "US",
    city: "New York",
    state: "NY",
    streetAddress: "123 Broadway St",
    zipCode: "10001"
  },
  {
    _id: "address-2",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+1 987 654 3210",
    email: "jane.smith@example.com",
    country: "US",
    city: "Los Angeles",
    state: "CA",
    streetAddress: "456 Hollywood Blvd",
    zipCode: "90028"
  }
];


  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]._id);
      dispatch(setAddressId(addresses[0]._id));
    }
  }, [addresses, selectedAddress, dispatch]);

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddress(addressId);
    dispatch(setAddressId(addressId));
    setShowAddAddress(false);
  };

  const handleAddNewAddressSelection = () => {
    setSelectedAddress("");
    setShowAddAddress(true);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      const address = addresses?.find((addr: { _id: string }) => addr._id === selectedAddress);
      if (address) {
        setBillingAddress(address);
        toast.success(`Selected billing address: ${address.firstName} ${address.lastName}`);
      }
    }
  };

  const handleAddNewAddress = (id?: string) => {
    if (id) {
      setSelectedAddress(id);
      dispatch(setAddressId(id));
      setShowAddAddress(false);
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading addresses...</div>;
  }

  // Show error state
  // if (error) {
  //   console.error(error);
  //   return <div className="py-8 text-center text-red-500">Error loading addresses. Please try again.</div>;
  // }

  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-3xl">Billing Details</h1>
      <div className="space-y-6">
        {addresses?.data?.addresses?.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Saved Addresses</h2>

            {addresses?.data?.addresses?.map((address: IAddress) => (
              <div
                key={address._id}
                className={`border rounded-lg p-4 ${selectedAddress === address._id ? 'border-primary' : ''}`}
              >
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="billingAddress"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={() => handleAddressSelection(address._id)}
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
                  onChange={handleAddNewAddressSelection}
                  className="h-5 w-5 text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Add new address</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {(showAddAddress || addresses?.data?.addresses?.length ===  0 || addresses?.data?.addresses?.length === undefined) && (
          <div className="mt-4">
            <AddressForm
              onSuccess={handleAddNewAddress}
            />
          </div>
        )}

        {!showAddAddress && addresses?.data?.addresses?.length > 0 && (
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