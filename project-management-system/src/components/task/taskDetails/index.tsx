import React from "react";
import styles from "./TaskDetails.module.scss";
import { Task } from "../../../shared/types/task";
import { AttachmentPreview } from "../attachmentPreview";
import { ActivitySection } from "../../../components/activity";

interface TaskDetailsProps {
  task: Task;
  handleAddAttachment: () => void;
}

const TaskDetails = ({ task, handleAddAttachment }: TaskDetailsProps) => {
  return (
    <div className={styles.details}>
      <div className={styles.taskTitleWrapper}>
        <div className={styles.taskMeta}>
          {task.type === "bug" ? "🐞" : task.type === "story" ? "📘" : "🧩"}
          <span className={styles.taskId}>{task.id}</span>
        </div>
        <h1 className={styles.taskTitle}>{task.title}</h1>
      </div>

      <p className={styles.description}>{task.description || "No description provided."}</p>

      <div className={styles.attachments}>
        <div className={styles.attachments_header}>
          <h4>Attachments</h4>
          <button
            onClick={handleAddAttachment}
            className={styles.addAttachmentBtn}
          >
            + Add Attachment
          </button>
        </div>

        {task.attachments?.length ? (
          <div className={styles.attachments_list}>
            {task.attachments.map((att) => (
              <AttachmentPreview
                key={att.id}
                name={att.name}
                url={att.url}
                type={att.type}
              />
            ))}
          </div>
        ) : (
          <p>No attachments</p>
        )}
      </div>

      <ActivitySection />
    </div>
  );
};

export default TaskDetails;
