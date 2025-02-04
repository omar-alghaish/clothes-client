// "use client";
// import React, { useState } from "react";
// import OrderItem from "./OrderItem";
// import img from "../../../../assets/images/i13.jpg";
// import brandIcon from "../../../../assets/brandIcons/hm.png";
// import OrderSummary from "./OrderSummary";
// import { Button } from "@/components/ui/button";
// import PaymentMethod from "./PaymentMethod";
// import BillingDetails from "./BillingDetails";

// const cart = {
//   totalItems: "3",
//   subTotal: "850",
//   shipping: "53",
//   texas: "00",
//   total: "750",
//   items: [
//     {
//       img: img.src,
//       title: "Summer Dress",
//       color: "Red",
//       size: "M",
//       brandIcon: brandIcon.src,
//       quantity: 3,
//       price: "30.00",
//     },
//     {
//       img: img.src,
//       title: "Denim Jacket",
//       color: "Blue",
//       size: "L",
//       brandIcon: brandIcon.src,
//       quantity: 1,
//       price: "50.00",
//     },
//   ],
// };

// const MainContent = () => {
//   const [status, setStatus] = useState<"checkout" | "continuePayment" | "confirmPayment">("checkout");

//   const handleNextStep = () => {
//     switch(status) {
//       case "checkout":
//         setStatus("continuePayment");
//         break;
//       case "continuePayment":
//         setStatus("confirmPayment");
//         break;
//       case "confirmPayment":
//         // Handle final submission
//         break;
//     }
//   };

//   return (
//     <div className="container flex flex-col md:flex-row gap-20 ">
//       {/* Main Content Area */}
//       <div className="flex-1">
//         {status === "checkout" && (
//           <div className="space-y-6 flex flex-col items-end">
//             {cart.items.map((item, index) => (
//               <div className="border-b-2 pb-6" key={index}>
//                 <OrderItem item={item} />
//               </div>
//             ))}
//             <div>
//               <Button variant="link" className="text-destructive text-xl">
//                 Clear Shopping Cart
//               </Button>
//             </div>
//           </div>
//         )}

//         {status === "continuePayment" && (
//           <BillingDetails />
//         )}

//         {status === "confirmPayment" && (
//           <PaymentMethod />
//         )}
//       </div>

//       {/* Order Summary */}
//       <div className="w-[350px] max-w-[100%] space-y-4 h-max top-0 sticky">
//         <OrderSummary
//           status={status}
//           onNextStep={handleNextStep}
//           cart={cart}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainContent;

"use client";
import React from "react";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import PaymentMethod from "./PaymentMethod";
import BillingDetails from "./BillingDetails";
import { clearCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";

const MainContent = () => {
  const [status, setStatus] = React.useState<
    "checkout" | "continuePayment" | "confirmPayment"
  >("checkout");
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleNextStep = () => {
    switch (status) {
      case "checkout":
        setStatus("continuePayment");
        break;
      case "continuePayment":
        setStatus("confirmPayment");
        break;
      case "confirmPayment":
        // Handle final submission
        break;
    }
  };

  return (
    <div className="container flex flex-col md:flex-row gap-20 ">
      <div className="flex-1">
        {status === "checkout" &&
          (cartItems.length > 0 ? (
            <div className="space-y-6 flex flex-col items-end">
              {cartItems.map((item) => (
                <div className="border-b-2 pb-6" key={item.id}>
                  <OrderItem item={item} />
                </div>
              ))}
              <div>
                <Button
                  variant="link"
                  className="text-destructive text-xl"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Shopping Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-4xl">Cart Is Empty</div>
          ))}

        {status === "continuePayment" && <BillingDetails />}
        {status === "confirmPayment" && <PaymentMethod />}
      </div>

      <div className="w-[350px] max-w-[100%] space-y-4 h-max top-0 sticky">
        <OrderSummary status={status} onNextStep={handleNextStep} />
      </div>
    </div>
  );
};

export default MainContent;
