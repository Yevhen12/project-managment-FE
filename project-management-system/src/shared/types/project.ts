// src/shared/types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  teamSize: number;
  currentSprint: string | null;
  role: ProjectRole;
}

export enum ProjectRole {
  ADMIN = "admin",
  DEVELOPER = "developer"
}
