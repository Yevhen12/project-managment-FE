export type TaskType = "story" | "bug" | "epic";
export type TaskStatus = "TO_DO" | "QA_READY" | "CODE_REVIEW" | "HOLD" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "high" | "medium" | "low" | "blocker";

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: "image" | "file";
};

export type CommentType = {
  id: number;
  author: string;
  text: string;
  createdAt: Date;
};


export type Task = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: "bug" | "story" | "task" | "epic";
  typeIcon?: React.ReactNode;
  status: string;
  statusLabel?: string;
  sprintName?: string;
  epic?: string;
  attachments?: Attachment[]
  priority: "low" | "medium" | "high" | "blocker";
  assignee?: string;
  assigneeAvatar?: string;
  reporter?: string;
  reporterAvatar?: string;
  labels?: string[];
  estimate: string;
  devStart?: string;
  devEnd?: string;
  qaStart?: string;
  qaEnd?: string;
};


export type TasksList = Task[];
