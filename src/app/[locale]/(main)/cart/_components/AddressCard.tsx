import { IAddress } from "@/redux/features/user/userApi";
import React from "react";


interface SavedAddressCardProps {
  address: IAddress;
}

const SavedAddressCard: React.FC<SavedAddressCardProps> = ({ address }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">
            {address.firstName} {address.lastName}
          </h3>
          <p className="text-sm text-gray-600">{address.streetAddress}</p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.state} {address.zipCode}
          </p>
          <p className="text-sm text-gray-600">{address.country}</p>
          <p className="text-sm text-gray-600">{address.phoneNumber}</p>
          <p className="text-sm text-gray-600">{address.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SavedAddressCard;