import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GroupsState {}

const initialState: GroupsState = {};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    makeGorup: (state, action: PayloadAction<string>) => {
      //여기 타입하고 구조는 나중에 변경해야함.
      state = {...state, id: action.payload};
    },
    editGroup: (state, action: PayloadAction<string>) => {
      // state.name = action.payload;
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      // state.name = action.payload;
    },
  },
});

export const {makeGorup, editGroup, removeGroup} = groupsSlice.actions;

export default groupsSlice.reducer;
