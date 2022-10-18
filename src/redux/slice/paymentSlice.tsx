import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GroupTypes} from '../../types/shared/group';
import {RootState} from '../store';
import {PaymentTypes} from '../../types/shared/payment';

export interface PaymentState {}

const initialState: PaymentState = {};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    makePayment: (state, action: PayloadAction<PaymentTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
    },
    editPayment: (state, action: PayloadAction<PaymentTypes>) => {
      state = {...state, [action.payload.id]: action.payload};
    },
    removePayment: (state, action: PayloadAction<unknown>) => {
      const id = action.payload as keyof typeof state;

      delete state[id];
    },
  },
});

const paymentsSelector = (state: RootState): PaymentState =>
  state.payments || initialState;

export const selectedPaymentSelector = createSelector(
  [paymentsSelector, (_, id) => id],
  (payments, id) => {
    return payments[id as keyof typeof payments];
  },
);

export const {makePayment, editPayment, removePayment} = paymentsSlice.actions;

export default paymentsSlice.reducer;
