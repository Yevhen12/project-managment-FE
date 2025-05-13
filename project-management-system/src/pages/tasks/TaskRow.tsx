import React from "react";
import { Task } from "../../shared/types/task";
import styles from "./TaskRow.module.scss";
import { Link } from "react-router-dom";
import { formatMinutes } from "../../shared/utils/time";

interface TaskRowProps {
  task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className={styles.priorityHigh}>▲</span>;
      case "medium":
        return <span className={styles.priorityMedium}>▲</span>;
      case "low":
        return <span className={styles.priorityLow}>▲</span>;
      case "blocker":
        return (
          <div className={styles.priorityBlockerWrapper}>
            <span className={styles.priorityBlocker}>—</span>
          </div>
        );
      default:
        return null;
    }
  };

  const assignee = typeof task.assignee === "object" ? task.assignee : null;
  const assigneeName = assignee
    ? `${assignee.firstName} ${assignee.lastName}`
    : "-";
  const initials = assignee
    ? `${assignee.firstName[0]}${assignee.lastName[0]}`
    : "";

  return (
    <Link to={`/tasks/${task.id}`} className={styles.taskRow}>
      <div className={styles.idSection}>
        <div className={`${styles.typeBadge} ${styles[task.type.toLowerCase()]}`}>
          {task.type === "bug" ? "🐞" : task.type === "story" ? "📘" : "🧩"}
        </div>
        <span className={styles.taskId} title={task.id}>
          {task.id.slice(0, 6)}...
        </span>
      </div>

      <div className={styles.titleSection}>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.subtitle}>
          {task.description?.split("\n")[0] || "-"}
        </div>
      </div>

      <div className={styles.epicText}>
        {task.epic && task.epic !== "None" ? task.epic : "-"}
      </div>

      <div className={`${styles.status} ${styles[task.status.toLowerCase().replace(/\s+/g, "")]}`}>
        {task.status}
      </div>

      <div className={styles.estimate}>
         {formatMinutes(Number(task.estimate) ?? 0)}
      </div>

      <div className={styles.assigneeBlock}>
        {getPriorityIcon(task.priority)}
        <div className={styles.assignee}>
          {assignee?.avatarUrl ? (
            <img
              src={assignee.avatarUrl}
              alt={assigneeName}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
          <span className={styles.assigneeName}>{assigneeName}</span>
        </div>
      </div>
    </Link>
  );
};

export default TaskRow;
