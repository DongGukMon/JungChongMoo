import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {PaymentTypes} from '../../types/shared/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GroupRemoveState {
  isVisible: boolean;
  id: string;
}

const initialState: GroupRemoveState = {
  isVisible: false,
  id: '',
};

export interface GroupRemoveTypes {
  isVisible: boolean;
  id: string;
}

export const groupRemoveSlice = createSlice({
  name: 'groupRemove',
  initialState,
  reducers: {
    modifyGroupRemoveData: (state, action: PayloadAction<GroupRemoveTypes>) => {
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

export const {modifyGroupRemoveData} = groupRemoveSlice.actions;

export default groupRemoveSlice.reducer;
