import React from "react";

interface Address {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const SavedAddressCard: React.FC<{ address: Address }> = ({ address }) => {
  const { firstName, lastName, streetAddress, city, state, zipCode, country } = address;
  
  return (
    <div className="flex flex-col">
      <span className="font-medium">{firstName} {lastName}</span>
      <span className="text-gray-600 text-sm">{streetAddress}</span>
      <span className="text-gray-600 text-sm">{city}, {state} {zipCode}</span>
      <span className="text-gray-600 text-sm">{country}</span>
    </div>
  );
};

export default SavedAddressCard;