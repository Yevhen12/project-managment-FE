import { Bug, Landmark, Rocket, ArrowUp, AlertTriangle, AlertCircle } from "lucide-react";

export const taskTypes = [
  { value: "story", label: "Story", icon: <Landmark size={16} /> },
  { value: "task", label: "Task", icon: <Rocket size={16} /> },
  { value: "bug", label: "Bug", icon: <Bug size={16} /> },
];

export const priorities = [
  { value: "high", label: "High", icon: <ArrowUp size={14} color="#f5a623" /> },  // Жовтий ап
  { value: "medium", label: "Medium", icon: <ArrowUp size={14} color="#3498db" /> }, // Синій ап
  { value: "low", label: "Low", icon: <ArrowUp size={14} color="#95a5a6" /> }, // Сірий ап
  { value: "blocker", label: "Blocker", icon: <AlertCircle size={14} color="#e74c3c" /> }, // Блокер
];

export const statuses = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "qa_ready", label: "QA Ready" },
  { value: "qa_testing", label: "QA Testing" },
  { value: "code_review", label: "Code Review" },
  { value: "done", label: "Done" },
];
