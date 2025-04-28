import { Task } from "../types/task";

export const users = [
  { id: 1, name: "Oleh", avatar: "🧑‍💻" },
  { id: 2, name: "Maria", avatar: "👩‍💻" },
  { id: 3, name: "Yevhen", avatar: "🧔" },
  { id: 4, name: "Anastasia", avatar: "👩" },
];

export const sprints = [
  { value: "sprint1", label: "Sprint 1" },
  { value: "sprint2", label: "Sprint 2" },
  { value: "sprint3", label: "Sprint 3" },
];

export const epics = [
  { value: "epic1", label: "Authentication" },
  { value: "epic2", label: "Payments" },
  { value: "epic3", label: "Task Management" },
];

export const mockTasks: Task[] = [
  {
    id: "BFL-4016",
    title: "[MOBILE] Restricted Items Bug - PDP",
    subtitle: "MOBILE - My Cart",
    type: "bug",
    epic: "BAU TASKS",
    status: "TO_DO",
    assignee: "AR",
    estimate: "0m",
    priority: "high",
  },
  {
    id: "BFL-12373",
    title: "[MOBILE][WEB][RESP] - Issue with warning modal",
    subtitle: "None",
    type: "story",
    epic: "None",
    status: "TO_DO",
    assignee: "AR",
    estimate: "0m",
    priority: "low",
  },
  {
    id: "BFL-12486",
    title: "[WEB][RESP] Do not display return option",
    subtitle: "None",
    type: "story",
    epic: "BAU TASKS",
    status: "QA_READY",
    assignee: "DC",
    estimate: "2d",
    priority: "medium",
  },
  {
    id: "BFL-12486",
    title: "[WEB][RESP] Do not display return option",
    subtitle: "None",
    type: "epic",
    epic: "BAU TASKS",
    status: "QA_READY",
    assignee: "DC",
    estimate: "2d",
    priority: "blocker",
  },
];
