import { Bug, Landmark, Rocket, ArrowUp, AlertTriangle, AlertCircle } from "lucide-react";

export const taskTypes = [
  { value: "story", label: "Story", icon: <Landmark size={16} /> },
  { value: "task", label: "Task", icon: <Rocket size={16} /> },
  { value: "bug", label: "Bug", icon: <Bug size={16} /> },
];

export const priorities = [
  { value: "High", label: "High", icon: <ArrowUp size={14} color="#f5a623" /> },  // Жовтий ап
  { value: "Medium", label: "Medium", icon: <ArrowUp size={14} color="#3498db" /> }, // Синій ап
  { value: "Low", label: "Low", icon: <ArrowUp size={14} color="#95a5a6" /> }, // Сірий ап
  // { value: "blocker", label: "Blocker", icon: <AlertCircle size={14} color="#e74c3c" /> }, // Блокер
];

export const statuses = [
  { value: "TO_DO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "QA_READY", label: "QA Ready" },
  { value: "QA_TESTING", label: "QA Testing" },
  { value: "REVIEW", label: "Review" },
  { value: "DONE", label: "Done" },
];