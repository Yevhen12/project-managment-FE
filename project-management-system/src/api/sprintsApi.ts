// src/api/project.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";
import { Project } from "../shared/types/project";
import { baseQueryWithReauth } from "./baseQuery";
import { Task } from "../shared/types/task";

export const sprintApi = createApi({
  reducerPath: "sprintApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Sprints"],
  endpoints: (builder) => ({

  }),
});

export const {  } = sprintApi;
