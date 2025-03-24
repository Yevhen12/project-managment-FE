// src/shared/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { projectApi } from '../api/project';
import activeProjectReducer from './slices/activeProjectSlice';

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    activeProject: activeProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

