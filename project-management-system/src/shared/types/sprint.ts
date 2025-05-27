import { Task } from "./task";

export type Sprint = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  forcedFinished: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
};
