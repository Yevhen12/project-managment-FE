// src/api/baseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import { clearActiveProject } from "../store/slices/activeProjectSlice";
import { projectApi } from "./project";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      // Спочатку беремо з Redux, якщо є
      const state = getState() as { auth?: { accessToken?: string } };
      let token = state.auth?.accessToken;

      // Якщо в Redux нема — пробуємо взяти з localStorage
      if (!token) {
        token = localStorage.getItem("accessToken") || "";
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  })

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
    api.dispatch(projectApi.util.resetApiState());
    api.dispatch(clearActiveProject())
    window.location.href = "/login";
  }

  return result;
};
