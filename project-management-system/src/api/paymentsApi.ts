// src/api/paymentsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createStripeSession: builder.mutation<{ url: string }, void>({
      query: () => ({
        url: "/payments/subscribe",
        method: "POST",
      }),
      transformResponse: (res: any) => res.data,
    }),
  }),
});

export const { useCreateStripeSessionMutation } = paymentsApi;
