import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '.';
import { Project } from '../shared/types/project';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery,
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      //@ts-ignore
      queryFn: () => {
        return {
          data: [
            {
              id: '1',
              name: 'Project Alpha',
              description: 'Building the new Alpha app.',
              teamSize: 5,
              currentSprint: 'Sprint 3',
              role: 'admin',
            },
            {
              id: '2',
              name: 'Project Beta',
              description: 'Internal tools for the Beta platform.',
              teamSize: 12,
              currentSprint: 'Sprint 7',
              role: 'developer',
            },
            {
              id: '3',
              name: 'Project Gamma',
              description: 'Research and development project.',
              teamSize: 3,
              currentSprint: null,
              role: 'developer',
            },
          ],
        };
      },
    }),
    
  }),
});

export const { useGetProjectsQuery } = projectApi;
