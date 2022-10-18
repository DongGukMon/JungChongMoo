import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GroupTypes} from '../../types/shared/group';
import {RootState} from '../store';
import {PaymentTypes} from '../../types/shared/payment';

interface AddPaymentPropTypes {
  groupId: string;
  paymentId: string;
  amount: number;
}

export interface GroupsState {}

const initialState: GroupsState = {};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    makeGorup: (state, action: PayloadAction<GroupTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
    },
    editGroup: (state, action: PayloadAction<GroupTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
    },
    removeGroup: (state, action: PayloadAction<unknown>) => {
      const id = action.payload as keyof typeof state;
      delete state[id];
    },
    addPayment: (state, action: PayloadAction<AddPaymentPropTypes>) => {
      const id = action.payload.groupId as keyof typeof state;
      const paymentId = action.payload.paymentId;
      state[id]['payments'] = [...state[id]['payments'], paymentId] as never;

      state[id]['totalPayments'] = (state[id]['totalPayments'] +
        action.payload.amount) as never;
    },
  },
});

const groupsSelector = (state: RootState): GroupsState =>
  state.groups || initialState;

export const selectedGroupSelector = createSelector(
  [groupsSelector, (_, id) => id],
  (groups, id) => {
    return groups[id as keyof typeof groups];
  },
);

export const {makeGorup, editGroup, removeGroup, addPayment} =
  groupsSlice.actions;

export default groupsSlice.reducer;
