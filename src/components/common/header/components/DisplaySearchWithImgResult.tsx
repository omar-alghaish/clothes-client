import { CartItem } from "../../cartItem";
import {  DisplaySearchWithImgResultProps } from "./types";

export const DisplaySearchWithImgResult: React.FC<DisplaySearchWithImgResultProps> = ({ 
  results, 
  onClose 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {results && results.length > 0 ? (
        results.map((item) => (
          <CartItem 
            key={item._id}
            img={item.img} 
            brand={item.brand} 
            _id={item._id} 
            name={item.title} 
            price={item.price} 
            rating={item.rating} 
            isBrand={false}
            onClick={onClose}
          />
        ))
      ) : (
        <div className="col-span-full text-center p-4">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}
    </div>
  );
};