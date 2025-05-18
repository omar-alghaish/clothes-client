"use client"
import { useParams } from 'next/navigation';
import { useGetOrderByIdQuery } from '@/redux/features/orders/orders.api';

// Updated Types to match the actual data structure
interface Product {
  _id: string;
  name: string;
  description?: string;
  img: string;
  // Any other product fields
}

interface Brand {
  _id: string;
  name: string;
  // Any other brand fields
}

interface OrderItem {
  product: Product;
  brand: Brand;
  quantity: number;
  price: number;
  size: string;
  color?: string;
}

// interface Order {
//   _id: string;
//   user: string;
//   items: OrderItem[];
//   status: string; // 'pending', 'placed', 'accepted', 'in_progress', 'shipping', 'delivered'
//   subTotal: number;
//   tax: number;
//   shipping: number;
//   totalPrice: number;
//   paymentMethod: string;
//   shippingAddress: string;
//   createdAt: string;
//   updatedAt: string;
//   estimatedDate: string;
//   active: boolean;
//   __v: number;
// }

// Icons
const IconReceipt = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
    <path d="M16 8h-6" />
    <path d="M16 12h-6" />
    <path d="M16 16h-6" />
  </svg>
);

const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
  </svg>
);

const IconPackage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
    <path d="M12 3v6" />
  </svg>
);

const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 17h4V5H2v12h3" />
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
    <path d="M14 17h1" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function OrderTrackingPage() {
  const { orderId } = useParams();

  const { data, isLoading, error } = useGetOrderByIdQuery(orderId as string);

  console.log(error);
  const order = data?.data;
  console.log(order);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load order data</p>
      </div>
    );
  }

  // Calculate progress percentage based on status
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'hh':
        return 0;
      case 'pending':
        return 20;
      case 'accepted':
        return 40;
      case 'in_progress':
        return 60;
      case 'shipping':
        return 80;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  // Determine if a step is completed based on current status
  const isStepCompleted = (step: string) => {
    const statusOrder = ['pending', 'accepted', 'in_progress', 'shipping', 'delivered'];
    const currentStatusIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(step);

    return stepIndex <= currentStatusIndex;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate expected dates based on the estimated delivery date
  const calculateExpectedDates = () => {
    const estimatedDelivery = new Date(order.estimatedDate);

    // Calculate intermediate dates (simplified approach - in a real app you might want more sophisticated logic)
    const inProgressDate = new Date(estimatedDelivery);
    inProgressDate.setDate(estimatedDelivery.getDate() - 2);

    const shippingDate = new Date(estimatedDelivery);
    shippingDate.setDate(estimatedDelivery.getDate() - 1);

    return {
      inProgress: formatDate(inProgressDate.toString()),
      shipping: formatDate(shippingDate.toString()),
      delivery: formatDate(estimatedDelivery.toString())
    };
  };

  const expectedDates = calculateExpectedDates();
  const orderPlacedDate = formatDate(order.createdAt);
  const orderPlacedTime = formatTime(order.createdAt);

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Your Order</h1>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-700">Order status: <span className="capitalize">{order.status}</span></p>
          <p className="text-gray-600">Order ID: {order._id}</p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
              <div
                className="h-1 bg-gray-900 transition-all duration-500"
                style={{ width: `${getProgressPercentage(order.status)}%` }}
              ></div>
            </div>

            {/* Status Points */}
            <div className="flex justify-between relative">
              {/* Order Placed */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10 ${isStepCompleted('placed')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                  <IconReceipt />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Order Pending</p>
                <p className="text-xs text-gray-700">
                  {orderPlacedDate}
                  <br />
                  {orderPlacedTime}
                </p>
              </div>

              {/* Accepted */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10 ${isStepCompleted('accepted')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                  <IconClipboard />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Order Accepted</p>
                <p className="text-xs text-gray-500">
                  {isStepCompleted('accepted') ? orderPlacedDate : 'Pending'}
                </p>
              </div>

              {/* In Progress */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10 ${isStepCompleted('in_progress')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                  <IconPackage />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Order In Progress</p>
                <p className="text-xs text-gray-500">
                  Expected
                  <br />
                  {expectedDates.inProgress}
                </p>
              </div>

              {/* On the Way */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10 ${isStepCompleted('shipping')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                  <IconTruck />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Order On the Way</p>
                <p className="text-xs text-gray-500">
                  Expected
                  <br />
                  {expectedDates.shipping}
                </p>
              </div>

              {/* Delivered */}
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full z-10 ${isStepCompleted('delivered')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                  <IconCheck />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">Order Delivered</p>
                <p className="text-xs text-gray-500">
                  Expected
                  <br />
                  {expectedDates.delivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Subtotal:</p>
              <p className="text-gray-600">Tax:</p>
              <p className="text-gray-600">Shipping:</p>
              <p className="font-medium text-gray-900">Total:</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">${order.subTotal.toFixed(2)}</p>
              <p className="text-gray-600">${order.tax.toFixed(2)}</p>
              <p className="text-gray-600">${order.shipping.toFixed(2)}</p>
              <p className="font-medium text-gray-900">${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Products</h2>
          <div className="space-y-4">
            {order.items.map((item: OrderItem) => (
              <div key={item.product._id} className="flex items-center border-b pb-4">
                <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                  {item.color && <p className="mt-1 text-sm text-gray-500">Color: {item.color}</p>}
                  <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                  <p className="mt-1 text-sm text-gray-500">Brand: <span className="font-bold text-red-600">{item.brand.name}</span></p>
                  <div className="mt-1 flex justify-between">
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}