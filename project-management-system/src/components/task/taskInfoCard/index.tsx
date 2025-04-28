import { FC, useState } from "react";
import { Task } from "../../../shared/types/task";
import styles from "./TaskInfoCard.module.scss";
import { Button } from "@mui/material";
import { Edit2, Trash2, Tag, User, Clock, Flag, Hash } from "lucide-react"; // лайт іконки
import { LogWorkModal } from "../../../components/modals/LogWorkModal";
import { formatLoggedTime } from "../utils";

interface TaskInfoCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskInfoCard: FC<TaskInfoCardProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const [isLogWorkModalOpen, setLogWorkModalOpen] = useState(false);

  const handleOpenLogWorkModal = () => setLogWorkModalOpen(true);
  const handleCloseLogWorkModal = () => setLogWorkModalOpen(false);

  const handleLogWork = (data: { days: number; hours: number; minutes: number; date: string; comment: string }) => {
    const totalMinutes = data.days * 24 * 60 + data.hours * 60 + data.minutes;
    
    const formattedTime = formatLoggedTime(data.days, data.hours, data.minutes); // 🧩 тут нова функція
  
    // setWorkLogs((prev) => [
    //   ...prev,
    //   {
    //     id: prev.length + 1,
    //     user: currentUserName,
    //     timeSpent: formattedTime, // ось тут форматована строка
    //     date: data.date,
    //     comment: data.comment,
    //   },
    // ]);
  
    // setLoggedMinutes((prev) => prev + totalMinutes);
  };
  
  

  return (
    <>
      <div className={styles.card}>
        <div className={styles.actions}>
          <Button
            startIcon={<Edit2 size={16} />}
            size="small"
            variant="contained"
            color="primary"
            onClick={onEdit}
          >
            Edit Task
          </Button>
          <Button
            startIcon={<Trash2 size={16} />}
            size="small"
            variant="outlined"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.icon}>
            <Flag size={16} />
          </span>
          <span className={styles.label}>Status:</span> {task.status}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.icon}>
            <User size={16} />
          </span>
          <span className={styles.label}>Assignee:</span>{" "}
          {task.assignee || "Unassigned"}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.icon}>
            <User size={16} />
          </span>
          <span className={styles.label}>Reporter:</span>{" "}
          {task.reporter || "Unknown"}
        </div>

        {task.labels && task.labels.length > 0 && (
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <Tag size={16} />
            </span>
            <span className={styles.label}>Labels:</span>{" "}
            {task.labels.join(", ")}
          </div>
        )}

        {task.priority && (
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <Flag size={16} />
            </span>
            <span className={styles.label}>Priority:</span>
            <span
              className={`${styles.priorityBadge} ${
                styles[task.priority.toLowerCase()]
              }`}
            >
              {task.priority}
            </span>
          </div>
        )}

        {task.estimate && (
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <Clock size={16} />
            </span>
            <span className={styles.label}>Estimate:</span> {task.estimate}
          </div>
        )}

        {task.sprintName && (
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <Hash size={16} />
            </span>
            <span className={styles.label}>Sprint:</span> {task.sprintName}
          </div>
        )}

        <div className={styles.timeTracking} onClick={handleOpenLogWorkModal}>
          <div className={styles.timeBarBackground}>
            <div className={styles.timeBarFill} style={{ width: "50%" }} />
          </div>
          <div className={styles.timeText}>2h logged / 4h estimated</div>
          <div className={styles.timeManagement}>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Time logged:</span>
              <span>2h</span>
            </div>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Time remaining:</span>
              <span>2h</span>
            </div>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Original estimate:</span>
              <span>4h</span>
            </div>
          </div>

          <div className={styles.timestamps}>
            <div className={styles.timestamp}>Created: 25 квітня 2025</div>
            <div className={styles.timestamp}>Updated: 27 квітня 2025</div>
          </div>
        </div>
      </div>
      <LogWorkModal
        open={isLogWorkModalOpen}
        onClose={handleCloseLogWorkModal}
        onSave={handleLogWork}
      />
    </>
  );
};
