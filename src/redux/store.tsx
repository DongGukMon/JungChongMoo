import {configureStore} from '@reduxjs/toolkit';
import groupsReducer from './slice/gorupsSlice';
import paymentsReducer from './slice/paymentSlice';
import groupRemoveReducer from './slice/groupRemoveSlice';
import paymentRemoveReducer from './slice/paymentRemoveSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    payments: paymentsReducer,
    groupRemoveData: groupRemoveReducer,
    paymentRemoveData: paymentRemoveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
