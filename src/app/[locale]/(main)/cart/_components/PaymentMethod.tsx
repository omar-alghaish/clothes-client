import { useState } from "react";
import { IPaymentCard, useGetPaymentCardsQuery } from "@/redux/features/user/userApi";
import AddCard from "./AddCard";
import Payment from "./payment";
import { useDispatch } from "react-redux";
import { setPaymentId } from "@/redux/features/orders/orders.slice";

type PaymentType = "credit-card" | "google-pay" | "mastercard" | "visa" | "paypal" | "cash";
type ExtendedPaymentCard = IPaymentCard & { type: PaymentType };

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [showAddCard, setShowAddCard] = useState(false);
  const { data: paymentMethods, isLoading, refetch } = useGetPaymentCardsQuery({});
  const dispatch = useDispatch();

  const handlePaymentSelection = (paymentId: string) => {
    setSelectedPayment(paymentId);
    dispatch(setPaymentId(paymentId));
    setShowAddCard(false);
  };

  const handleCashSelection = () => {
    setSelectedPayment("cash");
    dispatch(setPaymentId("0"));
    setShowAddCard(false);
  };

  const handleAddNewPaymentSelection = () => {
    setSelectedPayment("");
    dispatch(setPaymentId(""));
    setShowAddCard(true);
  };

  const handleAddCardSuccess = async (newCardId: string) => {
    await refetch();
    setSelectedPayment(newCardId);
    dispatch(setPaymentId(newCardId));
    setShowAddCard(false);
  };

  if (isLoading) return <div>Loading payment methods...</div>;
  // if (error) return <div>Error loading payment methods</div>;

  return (
    <div className="space-y-6">
      <h1 className="font-extrabold text-3xl mb-6">Payment Method</h1>
      <div className="space-y-4">
        {/* Cash payment option */}
        <div
          className={`border rounded-lg p-4 ${selectedPayment === "cash" ? 'border-primary' : ''}`}
        >
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={selectedPayment === "cash"}
              onChange={handleCashSelection}
              className="h-5 w-5 text-primary focus:ring-primary"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Cash on Delivery</span>
            </div>
          </label>
        </div>

        {/* Existing payment cards */}
        {paymentMethods?.data?.paymentCards?.map((payment: ExtendedPaymentCard) => (
          <div
            key={payment._id}
            className={`border rounded-lg p-4 ${selectedPayment === payment._id ? 'border-primary' : ''}`}
          >
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={payment._id}
                checked={selectedPayment === payment._id}
                onChange={() => handlePaymentSelection(payment._id)}
                className="h-5 w-5 text-primary focus:ring-primary"
              />
              <Payment
                type={payment.type}
                cardNumber={payment.cardNumber || ''}
              />
            </label>
          </div>
        ))}

        {/* Add new payment method option */}
        <div className={`border rounded-lg p-4 ${showAddCard ? 'border-primary' : ''}`}>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="new"
              checked={showAddCard}
              onChange={handleAddNewPaymentSelection}
              className="h-5 w-5 text-primary focus:ring-primary"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Add new payment method</span>
            </div>
          </label>
        </div>
        
        {showAddCard && (
          <div className="mt-4">
            <AddCard onSuccess={handleAddCardSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;