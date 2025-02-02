// // import React, { FC } from "react";
// // import img from "../../../../assets/images/i13.jpg";
// // import brandIcon from "../../../../assets/brandIcons/hm.png";
// // import { Separator } from "@/components/ui/separator";
// // import { Button } from "@/components/ui/button";

// // const cart = {
// //   totalItems: "3",
// //   subTotal: "850",
// //   shipping: "53",
// //   texas: "00",
// //   total: "750",
// //   items: [
// //     {
// //       img: img.src,
// //       title: "Summer Dress",
// //       color: "Red",
// //       size: "M",
// //       brandIcon: brandIcon.src,
// //       quantity: 3,
// //       price: "30.00",
// //     },
// //     {
// //       img: img.src,
// //       title: "Denim Jacket",
// //       color: "Blue",
// //       size: "L",
// //       brandIcon: brandIcon.src,
// //       quantity: 1,
// //       price: "50.00",
// //     },
// //   ],
// // };

// // interface IOrderSummary {
// //   status: string;
// // }
// // const OrderSummary: FC<IOrderSummary> = ({ status }) => {
// //   return (
// //     <div className="space-y-4">
// //       <h1>Order Summary</h1>
// //       <div className="space-y-2">
// //         <div className="flex justify-between items-center">
// //           <p className="text-foreground/70 font-bold">Items</p>
// //           <p className="font-extrabold">{cart.totalItems}</p>
// //         </div>
// //         <div className="flex justify-between items-center">
// //           <p className="text-foreground/70 font-bold">Sub Total</p>
// //           <p className="font-extrabold">{cart.subTotal}</p>
// //         </div>
// //         <div className="flex justify-between items-center">
// //           <p className="text-foreground/70 font-bold">Shipping</p>
// //           <p className="font-extrabold">{cart.shipping}</p>
// //         </div>
// //         <div className="flex justify-between items-center">
// //           <p className="text-foreground/70 font-bold">Texas</p>
// //           <p className="font-extrabold">{cart.texas}</p>
// //         </div>
// //         <div className="flex justify-between items-center">
// //           <p className="text-foreground/70 font-bold">Items</p>
// //           <p className="font-extrabold">{cart.totalItems}</p>
// //         </div>
// //       </div>
// //       <Separator />
// //       <div className="flex justify-between items-center">
// //         <p className="text-foreground/70 font-bold">Total</p>
// //         <p className="font-extrabold">{cart.total}</p>
// //       </div>
// //       {status == "checkout" ? (
// //         <Button className="w-full">Checkout</Button>
// //       ) : status == "continuePayment" ? (
// //         <Button className="w-full">Continue to Payment</Button>
// //       ) : status == "confirm payment" ? (
// //         <Button className="w-full">Confirm paymen</Button>
// //       ) : null}
// //     </div>
// //   );
// // };

// // export default OrderSummary;

// // OrderSummary.tsx
// import React, { FC } from "react";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface IOrderSummary {
//   status: "checkout" | "continuePayment" | "confirmPayment";
//   onNextStep: () => void;
//   cart: {
//     totalItems: string;
//     subTotal: string;
//     shipping: string;
//     texas: string;
//     total: string;
//   };
// }

// const OrderSummary: FC<IOrderSummary> = ({ status, onNextStep, cart }) => {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">Order Summary</h1>
//       <div className="space-y-2">
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <p className="text-foreground/70 font-bold">Items</p>
//             <p className="font-extrabold">{cart.totalItems}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-foreground/70 font-bold">Sub Total</p>
//             <p className="font-extrabold">{cart.subTotal}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-foreground/70 font-bold">Shipping</p>
//             <p className="font-extrabold">{cart.shipping}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-foreground/70 font-bold">Texas</p>
//             <p className="font-extrabold">{cart.texas}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-foreground/70 font-bold">Items</p>
//             <p className="font-extrabold">{cart.totalItems}</p>
//           </div>
//         </div>
//       </div>
//       <Separator />
//       <div className="flex justify-between items-center">
//         <p className="text-foreground/70 font-bold">Total</p>
//         <p className="font-extrabold">{cart.total}</p>
//       </div>

//       <div className="flex justify-between gap-2">
//         <Input /> <Button variant="outline">Apply Coupon</Button>
//       </div>
//       <Button className="w-full" onClick={onNextStep}>
//         {status === "checkout" && "Proceed to Checkout"}
//         {status === "continuePayment" && "Continue to Payment"}
//         {status === "confirmPayment" && "Confirm Payment"}
//       </Button>
//     </div>
//   );
// };

// export default OrderSummary;


import React, { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store/hooks";
import { selectSubtotal, selectTotal, selectTotalItems } from "@/redux/features/cartSlice";

interface IOrderSummary {
  status: "checkout" | "continuePayment" | "confirmPayment";
  onNextStep: () => void;
}

const OrderSummary: FC<IOrderSummary> = ({ status, onNextStep }) => {
  const subtotal = useAppSelector(selectSubtotal);
  const totalItems = useAppSelector(selectTotalItems);
  const total = useAppSelector(selectTotal);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Order Summary</h1>
      <div className="space-y-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-foreground/70 font-bold">Items</p>
            <p className="font-extrabold">{totalItems}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-foreground/70 font-bold">Sub Total</p>
            <p className="font-extrabold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-foreground/70 font-bold">Shipping</p>
            <p className="font-extrabold">$53.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-foreground/70 font-bold">Tax</p>
            <p className="font-extrabold">$0.00</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p className="text-foreground/70 font-bold">Total</p>
        <p className="font-extrabold">${total.toFixed(2)}</p>
      </div>

      <div className="flex justify-between gap-2">
        <Input placeholder="Coupon code" />
        <Button variant="outline">Apply</Button>
      </div>
      <Button className="w-full" onClick={onNextStep}>
        {status === "checkout" && "Proceed to Checkout"}
        {status === "continuePayment" && "Continue to Payment"}
        {status === "confirmPayment" && "Confirm Payment"}
      </Button>
    </div>
  );
};

export default OrderSummary;