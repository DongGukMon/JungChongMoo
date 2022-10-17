import {createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GroupPayloadTypes, GroupTypes} from '../../types/shared/group';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

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
      state = {...state, [action.payload.id]: action.payload};
    },
    removeGroup: (state, action: PayloadAction<unknown>) => {
      const id = action.payload as keyof typeof state;

      delete state[id];
    },
  },
});

// const groupsSelector = (state: RootState): GroupsState =>
//   state || initialState;

// export const groupListSelector = createSelector(
//   groupsSelector,
//   (groups) => {
//     Object.values(groups)
//     return ;
//   }
// );

export const {makeGorup, editGroup, removeGroup} = groupsSlice.actions;

export default groupsSlice.reducer;
