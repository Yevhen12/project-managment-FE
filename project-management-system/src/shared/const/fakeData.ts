//@ts-nocheck

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
  // To Do
  {
    id: "BFL-4017",
    title: "[MOBILE] Restricted Items Bug - PDP",
    description: "Restricted items issue on PDP page.",
    status: "to_do",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: "bug",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "medium",
    estimate: "2d",
    sprintName: "Sprint - 11",
  },
  {
    id: "BFL-4018",
    title: "[WEB] UI Misalignment",
    description: "UI misalignment on homepage banner.",
    status: "to_do",
    assignee: "Yevhen Lys",
    assigneeAvatar: "YL",
    type: "story",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["WEB"],
    priority: "high",
    estimate: "1d",
    sprintName: "Sprint - 11",
  },

  // In Progress
  {
    id: "BFL-4019",
    title: "[BACKEND] Refactor Payment API",
    description: "Refactoring the payment API endpoints for better security.",
    status: "in_progress",
    assignee: "Oleh Tarasov",
    assigneeAvatar: "OT",
    type: "epic",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["BACKEND"],
    priority: "low",
    estimate: "5d",
    sprintName: "Sprint - 11",
  },
  {
    id: "BFL-4020",
    title: "[MOBILE] Fix Login Crash",
    description: "App crashing after login attempt with empty password.",
    status: "in_progress",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: "bug",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "high",
    estimate: "1d",
    sprintName: "Sprint - 11",
  },

  // QA Ready
  {
    id: "BFL-4021",
    title: "[WEB] Add Sorting to Product List",
    description: "Allow users to sort products by price, rating, etc.",
    status: "qa_ready",
    assignee: "Yevhen Lys",
    assigneeAvatar: "YL",
    type: "story",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["WEB"],
    priority: "medium",
    estimate: "3d",
    sprintName: "Sprint - 11",
  },

  // QA Testing
  {
    id: "BFL-4022",
    title: "[MOBILE] Check Payment Gateway Integration",
    description: "Test mobile payment gateway with different credit cards.",
    status: "qa_testing",
    assignee: "Oleh Tarasov",
    assigneeAvatar: "OT",
    type: "bug",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "medium",
    estimate: "2d",
    sprintName: "Sprint - 11",
  },

  // Code Review
  {
    id: "BFL-4023",
    title: "[BACKEND] Improve DB indexing",
    description: "Optimize slow queries by adding proper DB indexes.",
    status: "code_review",
    assignee: "Yevhen Lys",
    assigneeAvatar: "YL",
    type: "story",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["BACKEND"],
    priority: "high",
    estimate: "2d",
    sprintName: "Sprint - 11",
  },

  // Done
  {
    id: "BFL-4024",
    title: "[WEB] Responsive Navigation Fix",
    description: "Fix navigation issues on mobile devices.",
    status: "done",
    assignee: "Abdul Razack",
    assigneeAvatar: "AR",
    type: "bug",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["WEB"],
    priority: "medium",
    estimate: "1d",
    sprintName: "Sprint - 11",
  },
  {
    id: "BFL-4025",
    title: "[MOBILE] Polish Onboarding Screens",
    description: "Update illustrations and improve onboarding UX.",
    status: "done",
    assignee: "Oleh Tarasov",
    assigneeAvatar: "OT",
    type: "story",
    reporter: "Anuradha Rajender",
    reporterAvatar: "AR",
    labels: ["MOBILE"],
    priority: "low",
    estimate: "2d",
    sprintName: "Sprint - 11",
  },
];

