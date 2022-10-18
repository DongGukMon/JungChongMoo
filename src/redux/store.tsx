import {configureStore} from '@reduxjs/toolkit';
import groupsReducer from './slice/gorupsSlice';
import paymentsSlice from './slice/paymentSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    payments: paymentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
