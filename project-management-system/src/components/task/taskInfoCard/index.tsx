import { FC, useState } from "react";
import { Task } from "../../../shared/types/task";
import styles from "./TaskInfoCard.module.scss";
import { Button } from "@mui/material";
import { Edit2, Trash2, Tag, User, Clock, Flag, Hash } from "lucide-react";
import { LogWorkModal } from "../../../components/modals/LogWorkModal";
import { formatLoggedTime } from "../utils";
import { formatMinutes } from "../../../shared/utils/time";
import {
  useAddWorkLogMutation,
  useGetTaskByIdQuery,
} from "../../../api/taskApi";

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

  const [addWorkLog] = useAddWorkLogMutation();
  const { refetch } = useGetTaskByIdQuery(task.id);

  const handleOpenLogWorkModal = () => setLogWorkModalOpen(true);
  const handleCloseLogWorkModal = () => setLogWorkModalOpen(false);

  const handleLogWork = async (data: {
    days: number;
    hours: number;
    minutes: number;
    date: string;
    comment: string;
  }) => {
    const totalMinutes = data.days * 1440 + data.hours * 60 + data.minutes;

    try {
      await addWorkLog({
        taskId: task.id,
        timeSpent: totalMinutes,
        workDate: data.date,
        comment: data.comment,
      }).unwrap();

      await refetch();
      handleCloseLogWorkModal();
    } catch (err) {
      console.error("Log work failed:", err);
    }
  };

  const estimateMinutes = Number(task.estimate) || 0;
  const loggedMinutes = task.loggedTime ?? 0;
  const remainingMinutes = Math.max(estimateMinutes - loggedMinutes, 0);

  const estimateFormatted = formatMinutes(estimateMinutes);
  const loggedFormatted = formatMinutes(loggedMinutes);
  const remainingFormatted = formatMinutes(remainingMinutes);
  const progressPercent = estimateMinutes
    ? Math.min((loggedMinutes / estimateMinutes) * 100, 100)
    : 0;

  const assigneeName =
    typeof task.assignee === "object"
      ? `${task.assignee.firstName} ${task.assignee.lastName}`
      : task.assignee || "Unassigned";

  const reporterName =
    typeof task.reporter === "object"
      ? `${task.reporter.firstName} ${task.reporter.lastName}`
      : task.reporter || "Unknown";

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
          <span className={styles.label}>Assignee:</span> {assigneeName}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.icon}>
            <User size={16} />
          </span>
          <span className={styles.label}>Reporter:</span> {reporterName}
        </div>

        {task?.labels && task?.labels?.length > 0 && (
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

        <div className={styles.infoItem}>
          <span className={styles.icon}>
            <Clock size={16} />
          </span>
          <span className={styles.label}>Estimate:</span> {estimateFormatted}
        </div>

        {task.sprint?.name && (
          <div className={styles.infoItem}>
            <span className={styles.icon}>
              <Hash size={16} />
            </span>
            <span className={styles.label}>Sprint:</span> {task.sprint.name}
          </div>
        )}

        <div className={styles.timeTracking} onClick={handleOpenLogWorkModal}>
          <div className={styles.timeBarBackground}>
            <div
              className={styles.timeBarFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className={styles.timeText}>
            {loggedFormatted} logged / {estimateFormatted} estimated
          </div>
          <div className={styles.timeManagement}>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Time logged:</span>
              <span>{loggedFormatted}</span>
            </div>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Time remaining:</span>
              <span>{remainingFormatted}</span>
            </div>
            <div className={styles.timeRow}>
              <span className={styles.timeLabel}>Original estimate:</span>
              <span>{estimateFormatted}</span>
            </div>
          </div>
          <div className={styles.timestamps}>
            {task.createdAt && (
              <div className={styles.timestamp}>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            )}
            {task.updatedAt && (
              <div className={styles.timestamp}>
                Updated: {new Date(task.updatedAt).toLocaleDateString()}
              </div>
            )}
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
