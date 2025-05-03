import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  addressId: string;
  paymentId: string;
}

const initialState: OrderState = {
  addressId: '',
  paymentId: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAddressId: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
    },
    setPaymentId: (state, action: PayloadAction<string>) => {
      state.paymentId = action.payload;
    },
    resetOrder: (state) => {
      state.addressId = '';
      state.paymentId = '';
    },
  },
});

export const { setAddressId, setPaymentId, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;