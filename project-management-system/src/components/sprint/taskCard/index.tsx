import React from "react";
import { Task } from "../../../shared/types/task";
import styles from "./TaskCard.module.scss";
import { Bug, Rocket, Landmark } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getTypeIcon = () => {
    if (task.type === "bug") return <Bug size={16} />;
    if (task.type === "story") return <Rocket size={16} />;
    return <Landmark size={16} />;
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {getTypeIcon()}
        <span className={styles.id}>{task.id}</span>
      </div>
      <div className={styles.title}>
        {task.title}
      </div>
      <div className={styles.bottom}>
        <div className={styles.priority}>{task.priority}</div>
        <div className={styles.assignee}>{task.assigneeAvatar}</div>
      </div>
    </div>
  );
};
