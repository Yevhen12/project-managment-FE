// src/api/project.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";
import { Project } from "../shared/types/project";
import { baseQueryWithReauth } from "./baseQuery";

type CreateProjectRequest = {
  name: string;
  description: string;
};

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getUserProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/projects/my",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Projects"],
      extraOptions: {
        refetchOnMountOrArgChange: true,
      },
    }),
    getProject: builder.query<Project, string>({
      query: (projectId) => ({
        url: `/projects/getOne/${projectId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["Projects"],
    }),
    getTeamForProject: builder.query<any[], string>({
      query: (projectId) => ({
        url: `/projects/team/projects/${projectId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
    }),
    sendInvite: builder.mutation<
      any,
      { email: string; role: string; projectId: string }
    >({
      query: (body) => ({
        url: "/projects/send-invite",
        method: "POST",
        body,
      }),
    }),
    getInvitesPendingUser: builder.query<any[], void>({
      query: () => ({
        url: "/projects/invites/pending",
        method: "GET",
      }),
      transformResponse: (res: any) => res.data,
    }),

    approveInvite: builder.mutation<any, string>({
      query: (inviteId) => ({
        url: `/projects/invites/approve/${inviteId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Projects"],
    }),

    declineInvite: builder.mutation<any, string>({
      query: (inviteId) => ({
        url: `/projects/invites/decline/${inviteId}`,
        method: "PATCH",
      }),
    }),
    updateTeamMemberRole: builder.mutation<
      any,
      { userId: string; projectId: string; newRole: string }
    >({
      query: ({ userId, projectId, newRole }) => ({
        url: `/projects/team/role`,
        method: "PATCH",
        body: { userId, projectId, newRole },
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteTeamMember: builder.mutation<
      any,
      { userId: string; projectId: string }
    >({
      query: ({ userId, projectId }) => ({
        url: `/projects/team`,
        method: "DELETE",
        body: { userId, projectId },
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetUserProjectsQuery,
  useCreateProjectMutation,
  useLazyGetProjectQuery,
  useGetTeamForProjectQuery,
  useSendInviteMutation,
  useDeclineInviteMutation,
  useApproveInviteMutation,
  useGetInvitesPendingUserQuery,
  useDeleteTeamMemberMutation,
  useUpdateTeamMemberRoleMutation,
} = projectApi;
