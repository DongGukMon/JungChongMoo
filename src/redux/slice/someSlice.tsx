import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  age: number;
}

const initialState: UserState = {
  name: 'kim',
  age: 15,
};

export const someSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    editAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
  },
});

export const {editName, editAge} = someSlice.actions;

export default someSlice.reducer;
