// store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import img from '../../assets/images/i12.jpg'
import brandIcon from "../../assets/brandIcons/hm.png"
import { RootState } from '../store';
export interface CartItem {
  id: string;
  img: string;
  title: string;
  color: string;
  size: string;
  brandIcon: string;
  quantity: number;
  price: string;
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  state: string;
  streetAddress: string;
  zipCode: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'google-pay' | 'mastercard' | 'visa' | 'paypal';
  cardNumber?: string;
  details?: {
    holderName: string;
    expireDate: string;
    cvv: string;
  };
}

interface CartState {
  items: CartItem[];
  billing?: BillingDetails;
  paymentMethods: PaymentMethod[];
}

// const initialState: CartState = {
//   items: [],
//   paymentMethods: []
// };


const initialState: CartState = {
    items: [     {
        id:"333",
              img: img.src,
              title: "Summer Dress",
              color: "Red",
              size: "M",
              brandIcon: brandIcon.src,
              quantity: 3,
              price: "30.00",
            },
            {
                id:"3234",
              img: img.src,
              title: "Denim Jacket",
              color: "Blue",
              size: "L",
              brandIcon: brandIcon.src,
              quantity: 1,
              price: "50.00",
            }],
    paymentMethods: [
          {
            id:'1',
            cardNumber: "35*********323",
            type: "visa",
          },
          {
            id:'2',
            cardNumber: "35*********323",
            type: "mastercard",
          },]
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{id: string; quantity: number}>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    saveBilling: (state, action: PayloadAction<BillingDetails>) => {
      state.billing = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    removePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethods = state.paymentMethods.filter(pm => pm.id !== action.payload);
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  saveBilling,
  addPaymentMethod,
  removePaymentMethod
} = cartSlice.actions;

export const selectSubtotal = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotal = (state: RootState) => {
  const subtotal = selectSubtotal(state);
  const shipping = 53; // You can make this dynamic
  const tax = 0;
  return subtotal + shipping + tax;
};

export default cartSlice.reducer;

export const selectPaymentMethods = (state: RootState) => state.cart.paymentMethods;
