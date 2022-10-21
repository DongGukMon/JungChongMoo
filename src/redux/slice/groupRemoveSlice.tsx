import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GroupRemoveState {
  isVisible: boolean;
  id: string;
  groupId?: Readonly<object | undefined>;
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

export const {modifyGroupRemoveData} = groupRemoveSlice.actions;

export default groupRemoveSlice.reducer;
