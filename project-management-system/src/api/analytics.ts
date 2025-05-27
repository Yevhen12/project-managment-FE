// src/api/analyticsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Analytics"],
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query<any, string>({
      query: (projectId) => `projects/projects/${projectId}/analytics/`,
      transformResponse: (res: any) => res.data,
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetAdminAnalyticsQuery } = analyticsApi;
