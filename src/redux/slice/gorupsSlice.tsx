import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GroupTypes} from '../../types/shared/group';
import {RootState} from '../store';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddPaymentPropTypes {
  groupId: string;
  paymentId: string;
  amount: number;
}

export interface GroupsState {
  //initializeGroup을 실행할 때 state[id]에서 나타나는 타입 에러 방지
  [k: string]: any;
}

const initialState: GroupsState = {};

const GROUPS = 'groups';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    initializeGroups: (
      state,
      action: PayloadAction<{[k: string]: GroupTypes}>,
    ) => {
      Object.keys(action.payload).map((id: string) => {
        state[id] = action.payload[id];
      });
    },
    makeGorup: (state, action: PayloadAction<GroupTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
      AsyncStorage.setItem(GROUPS, JSON.stringify(state));
    },
    editGroup: (state, action: PayloadAction<GroupTypes>) => {
      const id = action.payload.id as keyof typeof state;
      state[id] = action.payload as never;
      AsyncStorage.setItem(GROUPS, JSON.stringify(state));
    },
    removeGroup: (state, action: PayloadAction<unknown>) => {
      const id = action.payload as keyof typeof state;
      delete state[id];
      AsyncStorage.setItem(GROUPS, JSON.stringify(state));
    },
    addPayment: (state, action: PayloadAction<AddPaymentPropTypes>) => {
      const id = action.payload.groupId as keyof typeof state;
      const paymentId = action.payload.paymentId;
      state[id]['payments'] = [...state[id]['payments'], paymentId] as never;
      state[id]['totalPayments'] = (state[id]['totalPayments'] +
        action.payload.amount) as never;
      AsyncStorage.setItem(GROUPS, JSON.stringify(state));
    },
    removePaymentFromList: (
      state,
      action: PayloadAction<{
        groupId: Readonly<object | undefined>;
        paymentId: string;
        amount: number;
      }>,
    ) => {
      const paymentId = action.payload.paymentId;
      const groupId = action.payload.groupId as any;
      const idx = state[groupId].payments.indexOf(paymentId);
      const newPaymentsList = [...state[groupId].payments];
      if (idx > -1) newPaymentsList.splice(idx, 1);
      state[groupId].payments = newPaymentsList;

      state[groupId].totalPayments =
        state[groupId].totalPayments - action.payload.amount;
      AsyncStorage.setItem(GROUPS, JSON.stringify(state));
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

export const {
  makeGorup,
  editGroup,
  removeGroup,
  addPayment,
  initializeGroups,
  removePaymentFromList,
} = groupsSlice.actions;

export default groupsSlice.reducer;
