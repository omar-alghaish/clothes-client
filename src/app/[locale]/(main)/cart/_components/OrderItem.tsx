// import { Button } from "@/components/ui/button";
// import { Trash } from "lucide-react";
// import Image from "next/image";
// import React, { FC } from "react";

// export interface IOrderItem {
//   item: {
//     img: string;
//     title: string;
//     color: string;
//     size: string;
//     brandIcon: string;
//     quantity: number;
//     price: string;
//   };
// }

// const OrderItem: FC<IOrderItem> = ({ item }) => {
//   return (
//     <div className="flex flex-col md:flex-row gap-4 w-full p-4 border rounded-lg">
//       {/* Image Section */}
//       <div className="w-full md:w-[40%] lg:w-[20%] aspect-square md:aspect-[4/5]">
//         <Image
//           className="object-cover w-full h-full rounded-md"
//           src={item.img}
//           width={1000}
//           height={1000}
//           alt={item.title}
//         />
//       </div>

//       {/* Content Section */}
//       <div className="flex-1 flex flex-col justify-between gap-4 md:gap-6">
//         {/* Title and Price */}
//         <div className="flex flex-col md:flex-row md:justify-between gap-2">
//           <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
//             {item.title}
//           </h1>
//           <span className="text-lg md:text-xl lg:text-2xl font-semibold">
//             ${item.price}
//           </span>
//         </div>

//         {/* Product Details */}
//         <div className="space-y-2 md:space-y-3">
//           <p className="text-muted-foreground text-base md:text-lg">
//             Color: {item.color}
//           </p>
//           <p className="text-muted-foreground text-base md:text-lg">
//             Size: {item.size}
//           </p>
//           <div className="flex items-center gap-2">
//             <span className="text-muted-foreground text-base md:text-lg">
//               Brand:
//             </span>
//             <div className="h-4 md:h-5 w-auto">
//               <Image
//                 className="object-contain h-full w-full"
//                 src={item.brandIcon}
//                 width={100}
//                 height={100}
//                 alt={`${item.title} brand`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Quantity Controls */}
//         <div className="flex flex-col md:flex-row justify-between items-start xs:items-center gap-4 w-full">
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               className="rounded-full p-0 h-8 w-8 md:h-10 md:w-10 text-xl md:text-2xl"
//             >
//               -
//             </Button>
//             <span className="text-lg md:text-xl w-8 text-center">
//               {item.quantity}
//             </span>
//             <Button
//               variant="outline"
//               className="rounded-full p-0 h-8 w-8 md:h-10 md:w-10 text-xl md:text-2xl"
//             >
//               +
//             </Button>
//           </div>
          
//           <Button variant="ghost" className="p-2 hover:bg-destructive/10">
//             <Trash className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderItem;

// OrderItem.tsx
import { Button } from "@/components/ui/button";
import { useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/redux/features/cart/cartApi";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";
import { toast } from "sonner";

// Define the item interface
interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
  color: string;
  size: string;
  price: number;
  img: string;
  brand: {
    brandLogo: string;
    _id: string;
    brandName: string;
  };
}

interface OrderItemProps {
  item: CartItem;
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [pendingOperation, setPendingOperation] = useState<string | null>(null);

  // Function to update quantity
  const handleQuantityChange = async (newQuantity?: number) => {
    if (!newQuantity || newQuantity === item.quantity || isUpdating) return;
    
    const operation = newQuantity > item.quantity ? "increase" : "decrease";
    setPendingOperation(operation);
    
    try {
      await updateCartItem({
        itemId: item._id,
        productId: item.product._id,
        change: operation
      }).unwrap();
      
      toast.success(`Quantity updated successfully`);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error(`Failed to update quantity`);
    } finally {
      setPendingOperation(null);
    }
  };

  // Function to remove product from cart
  const handleRemove = async () => {
    if (isRemoving) return;
    
    setPendingOperation('remove');
    try {
      await removeFromCart(item.product._id).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove product:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setPendingOperation(null);
    }
  };

  const isDecreaseLoading = pendingOperation === 'decrease';
  const isIncreaseLoading = pendingOperation === 'increase';
  const isRemoveLoading = pendingOperation === 'remove';

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full p-4 border rounded-lg">
      <div className="w-full md:w-[40%] lg:w-[20%] aspect-square md:aspect-[4/5] relative">
        <Image
          className="object-cover w-full h-full rounded-md"
          src={item.img}
          width={1000}
          height={1000}
          alt={item.product.name}
        />
        {(isRemoveLoading || isDecreaseLoading || isIncreaseLoading) && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-md">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between gap-4 md:gap-6">
        {/* Title and Price */}
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            {item.product.name}
          </h1>
          <span className="text-lg md:text-xl lg:text-2xl font-semibold">
            ${item.price}
          </span>
        </div>
        {/* Product Details */}
        <div className="space-y-2 md:space-y-3">
          <p className="text-muted-foreground text-base md:text-lg">
            Color: {item.color}
          </p>
          <p className="text-muted-foreground text-base md:text-lg">
            Size: {item.size}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-base md:text-lg">
              Brand:
            </span>
           
            <div className="h-4 md:h-5 w-auto">
               {
              // !item.brand.brandLogo ?   <Image
              //   className="object-contain h-full w-full"
              //   src={item.brand.brandLogo}
              //   width={100}
              //   height={100}
              //   alt={`${item.product.name} brand`}
              // />: 
              
              <h2>{item.brand.brandName}</h2>
            }
            
            </div>
          </div>
        </div>
        {/* Quantity Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start xs:items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full p-0 h-8 w-8 md:h-10 md:w-10 text-xl md:text-2xl"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || isDecreaseLoading || isIncreaseLoading || isRemoveLoading}
            >
              -
            </Button>
            <span className="text-lg md:text-xl w-8 text-center">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              className="rounded-full p-0 h-8 w-8 md:h-10 md:w-10 text-xl md:text-2xl"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isIncreaseLoading || isDecreaseLoading || isRemoveLoading}
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            className="p-2 hover:bg-destructive/10"
            onClick={handleRemove}
            disabled={isRemoveLoading || isUpdating}
          >
            <Trash className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;