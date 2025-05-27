// src/api/sprintApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { Sprint } from "../shared/types/sprint";

export const sprintApi = createApi({
  reducerPath: "sprintApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Sprint"],
  endpoints: (builder) => ({
    getActiveSprint: builder.query<Sprint, string>({
      query: (projectId) => `/projects/sprints/${projectId}/active`,
      transformResponse: (res: any) => res.data,
      providesTags: ["Sprint"],
    }),
    getProjectSprints: builder.query<Sprint, string>({
      query: (projectId) => `/projects/sprints/${projectId}`,
      transformResponse: (res: any) => res.data,
    }),
    createSprint: builder.mutation<any, { projectId: string; body: any }>({
      query: ({ projectId, body }) => ({
        url: `/projects/sprints`,
        method: "POST",
        body: {
          ...body,
          projectId,
        },
      }),
      invalidatesTags: ["Sprint"],
    }),
    finishSprint: builder.mutation({
      query: ({ sprintId }: { sprintId: string }) => ({
        url: `/projects/sprints/${sprintId}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["Sprint"],
    }),
    getCompletedSprints: builder.query<Sprint[], string>({
      query: (projectId) => `/projects/sprints/archived/${projectId}/`,
      transformResponse: (res: any) => res.data,
    }),
  }),
});

export const {
  useGetActiveSprintQuery,
  useCreateSprintMutation,
  useFinishSprintMutation,
  useGetProjectSprintsQuery,
  useGetCompletedSprintsQuery,
} = sprintApi;
