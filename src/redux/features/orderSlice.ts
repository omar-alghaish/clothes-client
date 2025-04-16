// store/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface BillingDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
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

interface OrderState {
  cartId?: string;
  addressId?: string;
  address?: BillingDetails;
  paymentMethodId?: string;
  paymentMethod?: PaymentMethod;
}

const initialState: OrderState = {
  // Empty initial state
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },
    
    // Address related actions
    setAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
      // When setting addressId, clear the direct address object
      state.address = undefined;
    },
    
    setAddress: (state, action: PayloadAction<BillingDetails>) => {
      state.address = action.payload;
      // When setting direct address, clear the addressId
      state.addressId = undefined;
    },
    
    // Payment method related actions
    setPaymentMethodId: (state, action: PayloadAction<string>) => {
      state.paymentMethodId = action.payload;
      // When setting paymentMethodId, clear the direct paymentMethod object
      state.paymentMethod = undefined;
    },
    
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
      // When setting direct paymentMethod, clear the paymentMethodId
      state.paymentMethodId = undefined;
    },
    
    // Clear actions
    clearBillingDetails: (state) => {
      state.addressId = undefined;
      state.address = undefined;
    },
    
    clearPaymentMethod: (state) => {
      state.paymentMethodId = undefined;
      state.paymentMethod = undefined;
    },
    
    clearOrder: () => {
      return initialState;
    }
  }
});

// Export actions
export const {
  setCartId,
  setAddressId,
  setAddress,
  setPaymentMethodId,
  setPaymentMethod,
  clearBillingDetails,
  clearPaymentMethod,
  clearOrder
} = orderSlice.actions;

// Selectors
export const selectCartId = (state: RootState) => state.order.cartId;
export const selectAddressId = (state: RootState) => state.order.addressId;
export const selectAddress = (state: RootState) => state.order.address;
export const selectPaymentMethodId = (state: RootState) => state.order.paymentMethodId;
export const selectPaymentMethod = (state: RootState) => state.order.paymentMethod;
export const selectHasBillingDetails = (state: RootState) => 
  Boolean(state.order.addressId || state.order.address);
export const selectHasPaymentMethod = (state: RootState) => 
  Boolean(state.order.paymentMethodId || state.order.paymentMethod);

export default orderSlice.reducer;