import React from "react";
import { useNavigate } from "react-router-dom";
import { Task } from "../../../shared/types/task";
import styles from "./TaskCard.module.scss";
import { Bug, Rocket, Landmark } from "lucide-react";
import { Avatar } from "@mui/material";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const getTypeIcon = () => {
    if (task.type === "bug") return <Bug size={16} />;
    if (task.type === "story") return <Rocket size={16} />;
    return <Landmark size={16} />;
  };

  const assigneeName =
    task.assignee?.firstName && task.assignee?.lastName
      ? `${task.assignee.firstName} ${task.assignee.lastName}`
      : "";

  const assigneeInitials =
    task.assignee?.firstName && task.assignee?.lastName
      ? `${task.assignee.firstName[0] ?? ""}${task.assignee.lastName[0] ?? ""}`
      : "";

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.top}>
        {getTypeIcon()}
        <span className={styles.id}>{task.id.slice(0, 6)}</span>
      </div>

      <div className={styles.title}>{task.title}</div>

      <div className={styles.bottom}>
        <div className={styles.priority}>{task.priority}</div>
        <div className={styles.assignee}>
          <Avatar
            alt={assigneeName}
            src={task.assignee?.avatarUrl || ""}
            sx={{
              width: 24,
              height: 24,
              fontSize: 12,
              bgcolor: "#1976d2",
            }}
          >
            {assigneeInitials}
          </Avatar>
        </div>
      </div>
    </div>
  );
};
