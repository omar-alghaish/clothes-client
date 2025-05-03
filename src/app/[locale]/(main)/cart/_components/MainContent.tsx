"use client";
import React from "react";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import PaymentMethod from "./PaymentMethod";
import BillingDetails from "./BillingDetails";
import { useGetCartQuery, useRemoveCartMutation } from "@/redux/features/cart/cartApi";
import { useAddOrderMutation } from "@/redux/features/orders/orders.api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import Link from "next/link";

const MainContent = () => {
  const [status, setStatus] = React.useState<
    "checkout" | "continuePayment" | "confirmPayment"
  >("checkout");

  const { data: cart, isLoading, isError, refetch } = useGetCartQuery({});
  const [clearCart, { isLoading: isClearingCart }] = useRemoveCartMutation();
  const [addOrder, { isLoading: isOrderProcessing }] = useAddOrderMutation();
  
  // Get address ID from Redux store
  const { addressId, paymentId } = useSelector((state: RootState) => state.order);

  const cartItems = cart?.data?.items || [];
  const cartId = cart?.data?._id;

  const handleClearCart = async () => {
    try {
      await clearCart({}).unwrap();
      toast.success("Cart cleared successfully");
      refetch();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const handleNextStep = async () => {
    switch (status) {
      case "checkout":
        setStatus("continuePayment");
        break;
      case "continuePayment":
        setStatus("confirmPayment");
        break;
      case "confirmPayment":
        // Check if we have all required data
        if (!addressId) {
          toast.error("Please select a billing address");
          return;
        }
        
        if (!paymentId) {
          toast.error("Please select a payment method");
          return;
        }
        
        if (!cartId) {
          toast.error("Your cart is empty");
          return;
        }
        
        try {
          // Process the order
          const orderData = {
            addressId,
            paymentId,
            cartId
          };
          
          await addOrder(orderData).unwrap();
          toast.success("Order placed successfully!");
          
          // Redirect to success page or order history
          // You might want to use router.push('/order-success') here
          
        } catch (error) {
          console.error("Failed to place order:", error);
          toast.error("Failed to place order. Please try again.");
        }
        break;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-80 w-full">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-lg text-muted-foreground">Loading your cart...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center h-80 w-full">
          <p className="text-lg text-destructive mb-4">Something went wrong.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      );
    }

    if (status === "checkout") {
      if (cartItems.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-80 w-full">
            <p className="text-2xl font-medium mb-6">Your cart is empty</p>
            <Button><Link href={"/shop"}>Continue Shopping</Link></Button>
          </div>
        );
      }

      return (
        <div className="space-y-6 flex flex-col items-end">
          {cartItems.map((item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => (
            <div className="border-b-2 pb-6 w-full" key={item._id}>
              <OrderItem item={item} />
            </div>
          ))}
          <div>
            <Button
              variant="outline"
              className="text-destructive"
              onClick={handleClearCart}
              disabled={isClearingCart}
            >
              {isClearingCart ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing...
                </>
              ) : (
                "Clear Shopping Cart"
              )}
            </Button>
          </div>
        </div>
      );
    }

    if (status === "continuePayment") {
      return <BillingDetails />;
    }

    return <PaymentMethod />;
  };

  return (
    <div className="container min-h-screen flex flex-col md:flex-row gap-20">
      <Toaster position="top-center" />
      <div className="flex-1">{renderContent()}</div>
      <div className="w-full md:w-[350px] space-y-4 h-max top-0 sticky">
        <OrderSummary
          status={status}
          onNextStep={handleNextStep}
          cart={cart?.data}
          isLoading={isLoading || isClearingCart || isOrderProcessing}
        />
      </div>
    </div>
  );
};

export default MainContent;