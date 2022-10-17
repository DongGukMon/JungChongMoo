import {configureStore} from '@reduxjs/toolkit';
import groupsReducer from './slice/gorupsSlice';

export const store = configureStore({
  reducer: {
    group: groupsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
