import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {PaymentTypes} from '../../types/shared/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PaymentRemoveState {
  isVisible: boolean;
  id: string;
}

const initialState: PaymentRemoveState = {
  isVisible: false,
  id: '',
};

export interface PaymentRemoveTypes {
  isVisible: boolean;
  id: string;
}

export const paymentRemoveSlice = createSlice({
  name: 'paymentRemove',
  initialState,
  reducers: {
    modifyPaymentRemoveData: (
      state,
      action: PayloadAction<PaymentRemoveTypes>,
    ) => {
      state.isVisible = action.payload.isVisible;
      state.id = action.payload.id;
    },
  },
});

// const paymentsSelector = (state: RootState): RemoveMotalState =>
//   state.payments || initialState;

// export const selectedPaymentSelector = createSelector(
//   [paymentsSelector, (_, id) => id],
//   (payments, id) => {
//     return payments[id as keyof typeof payments];
//   },
// );

export const {modifyPaymentRemoveData} = paymentRemoveSlice.actions;

export default paymentRemoveSlice.reducer;
