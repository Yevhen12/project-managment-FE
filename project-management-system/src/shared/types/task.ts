export type TaskType = "story" | "bug" | "epic";
export type TaskStatus =
  | "TO_DO"
  | "QA_READY"
  | "CODE_REVIEW"
  | "HOLD"
  | "IN_PROGRESS"
  | "DONE";
export type TaskPriority = "high" | "medium" | "low" | "blocker";

export type Attachment = {
  id: string;
  fileName: string;
  url: string;
  type: "image" | "file";
};

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export type WorkLogEntry = {};

export type Task = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: "bug" | "story" | "task" | "epic";
  typeIcon?: React.ReactNode;
  status: string;
  statusLabel?: string;
  sprint?: any;
  sprintName?: string;
  epic?: string;
  comments?: CommentType[];
  loggedTime?: number;
  workLogs?: any;
  attachments?: Attachment[];
  priority: "low" | "medium" | "high" | "blocker";
  assignee?: any;
  assigneeAvatar?: string;
  reporter?: any;
  reporterAvatar?: string;
  labels?: string[];
  estimate: number;
  devStart?: string;
  devEnd?: string;
  qaStart?: string;
  qaEnd?: string;
  createdAt?: string;
  updatedAt?: string;
  sprintId?: string
};

export type TasksList = Task[];
