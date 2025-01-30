import React from "react";

interface AdditionalInfoTableProps {
  data: {
    [key: string]: string | string[];
  };
}

const AdditionalInfoTable: React.FC<AdditionalInfoTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden  ">
        <div className="flex bg-black text-primary-foreground dark:bg-white ">
         <div className="w-1/3 p-4 font-medium">
            features
          </div>
          <div className="w-2/3 p-4">
            description
          </div>     
        </div>
        
      {Object.entries(data).map(([key, value], index) => (
        <div
          key={key}
          className={`flex  ${
            index % 2 === 0 ? "bg-gray-50 dark:bg-background" : "bg-white dark:bg-foreground/5"
          }`}
        >
          <div className="w-1/3 p-4 font-medium text-gray-600 dark:text-gray-50 capitalize">
            {key}
          </div>
          <div className="w-2/3 p-4 text-gray-800 dark:text-gray-50">
            {Array.isArray(value) ? value.join(", ") : value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdditionalInfoTable;
