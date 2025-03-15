import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // Añadiremos más reducers en el futuro
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
