// src/shared/types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  teamMembers: {
    id: string;
    role: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
  currentSprint: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  } | null;
  myRole: ProjectRole;
}

export enum ProjectRole {
  ADMIN = "admin",
  DEVELOPER = "developer",
}

export interface ProjectMember {
  id: string;
  role: ProjectRole;
  projectId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
    bio?: string | null;
    phone?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}
