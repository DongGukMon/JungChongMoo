import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GroupTypes} from '../../types/shared/group';
import {RootState} from '../store';
import {PaymentTypes} from '../../types/shared/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PaymentState {
  [k: string]: any;
}

const initialState: PaymentState = {};

const PAYMENTS = 'payments';

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    initializePayments: (
      state,
      action: PayloadAction<{[k: string]: PaymentTypes}>,
    ) => {
      // state = action.payload는 안되는 이유가 뭐야...
      Object.keys(action.payload).map((id: string) => {
        state[id] = action.payload[id];
      });
    },
    makePayment: (state, action: PayloadAction<PaymentTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
      AsyncStorage.setItem(PAYMENTS, JSON.stringify(state));
    },
    editPayment: (state, action: PayloadAction<PaymentTypes>) => {
      state = {...state, [action.payload.id]: action.payload};
      AsyncStorage.setItem(PAYMENTS, JSON.stringify(state));
    },
    removePayment: (state, action: PayloadAction<unknown>) => {
      const id = action.payload as keyof typeof state;
      delete state[id];
      AsyncStorage.setItem(PAYMENTS, JSON.stringify(state));
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

export const relatedPaymentSelector = createSelector(
  [paymentsSelector, (_, ids) => ids],
  (payments, ids) => {
    return ids.map((id: string) => payments[id]);
  },
);

export const {makePayment, editPayment, removePayment, initializePayments} =
  paymentsSlice.actions;

export default paymentsSlice.reducer;
