import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { Task } from "../shared/types/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasksForProject: builder.query<Task[], string>({
      query: (projectId) => ({
        url: `/projects/tasks/project/${projectId}`,
        method: "GET",
      }),
      transformResponse: (res: any) => res.data,
      providesTags: (result, error, projectId) =>
        result
          ? [
              { type: "Task", id: "LIST" },
              ...result.map((task) => ({ type: "Task" as const, id: task.id })),
            ]
          : [{ type: "Task", id: "LIST" }],
    }),
    createTask: builder.mutation<void, any>({
      query: (body) => ({
        url: "/projects/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `/projects/tasks/${id}`,
      transformResponse: (res: any) => res.data,
      providesTags: (result) =>
        result ? [{ type: "Task", id: result.id }] : [],
    }),

    editTask: builder.mutation<Task, { taskId: string; body: Partial<Task> }>({
      query: ({ taskId, body }) => ({
        url: `/projects/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_res, _err, { taskId }) => [
        { type: "Task", id: taskId },
        { type: "Task", id: "LIST" },
      ],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/projects/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, taskId) => [
        { type: "Task", id: taskId },
        { type: "Task", id: "LIST" },
      ],
    }),

    addWorkLog: builder.mutation<
      void,
      {
        taskId: string;
        timeSpent: number;
        workDate: string;
        comment?: string;
      }
    >({
      query: (body) => ({
        url: "/projects/tasks/work-log",
        method: "POST",
        body,
      }),
    }),
    addComment: builder.mutation<void, { taskId: string; text: string }>({
      query: ({ taskId, text }) => ({
        url: `/projects/tasks/comment`,
        method: "POST",
        body: { taskId, content: text },
      }),
      invalidatesTags: (_result, _error, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),
    addAttachment: builder.mutation<any, { taskId: string; file: File }>({
      query: ({ taskId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/projects/tasks/${taskId}/attachments`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_res, _err, { taskId }) => [
        { type: "Task", id: taskId },
      ],
    }),
    deleteAttachment: builder.mutation<void, string>({
      query: (attachmentId) => ({
        url: `/projects/tasks/attachments/${attachmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Task", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTasksForProjectQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useAddWorkLogMutation,
  useAddCommentMutation,
  useAddAttachmentMutation,
  useDeleteAttachmentMutation,
} = taskApi;
