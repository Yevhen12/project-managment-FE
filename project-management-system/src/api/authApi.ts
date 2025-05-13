import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, User } from "../store/slices/authSlice";
import { ACCESS_TOKEN } from "../shared/const/localStorage";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: (builder) => ({
    register: builder.mutation<
      any,
      { firstName: string; lastName: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.data));
          localStorage.setItem(ACCESS_TOKEN, data.data.tokens.accessToken);
        } catch (err) {
          console.error("Register failed:", err);
        }
      },
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data.data));
          localStorage.setItem(ACCESS_TOKEN, data.data.tokens.accessToken);
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
    // src/api/authApi.ts

    getFullProfile: builder.query<any, void>({
      query: () => ({
        url: "/users/fullProfile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation<any, Partial<User>>({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
    }),
    getUsers: builder.query<any[], void>({
      query: () => ({
        url: "/users/getAll",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyGetFullProfileQuery,
  useUpdateProfileMutation,
  useGetUsersQuery,
} = authApi;
