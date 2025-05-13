// src/shared/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../api/project";
import { authApi } from "../api/authApi"; // ✅ додай
import activeProjectReducer from "./slices/activeProjectSlice";
import authReducer from "./slices/authSlice"; // ✅ додай якщо є
import tasksReducer from "./slices/taskSlice";
import { taskApi } from "../api/taskApi";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // ✅ auth API
    activeProject: activeProjectReducer,
    auth: authReducer, // ✅ auth slice
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      authApi.middleware, // ✅ додай middleware
      taskApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
