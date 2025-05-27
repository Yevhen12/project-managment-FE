// src/shared/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../api/project";
import { authApi } from "../api/authApi"; // ✅ додай
import activeProjectReducer from "./slices/activeProjectSlice";
import authReducer from "./slices/authSlice"; // ✅ додай якщо є
import tasksReducer from "./slices/taskSlice";
import { taskApi } from "../api/taskApi";
import { sprintApi } from "../api/sprintsApi";
import { analyticsApi } from "../api/analytics";
import { paymentsApi } from "../api/paymentsApi";

export const store = configureStore({
  reducer: {
    [projectApi.reducerPath]: projectApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [sprintApi.reducerPath]: sprintApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // ✅ auth API
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    activeProject: activeProjectReducer,
    auth: authReducer, // ✅ auth slice
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectApi.middleware,
      authApi.middleware, // ✅ додай middleware
      taskApi.middleware,
      sprintApi.middleware,
      analyticsApi.middleware,
      paymentsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
