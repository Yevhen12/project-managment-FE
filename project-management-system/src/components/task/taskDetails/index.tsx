import React from "react";
import styles from "./TaskDetails.module.scss";
import { Task } from "../../../shared/types/task";
import { AttachmentPreview } from "../attachmentPreview";
import { ActivitySection } from "../../../components/activity";
import { useDeleteAttachmentMutation, useGetTaskByIdQuery } from "../../../api/taskApi";
import { useParams } from "react-router-dom";

interface TaskDetailsProps {
  task: Task;
  handleAddAttachment: () => void;
}

const TaskDetails = ({ task, handleAddAttachment }: TaskDetailsProps) => {
  const { taskId } = useParams<{ taskId: string }>();
  const [deleteAttachment] = useDeleteAttachmentMutation();
  const { refetch } = useGetTaskByIdQuery(taskId!, { skip: !taskId });

  const handleDeleteAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to delete attachment", err);
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.taskTitleWrapper}>
        <div className={styles.taskMeta}>
          {task.type === "bug" ? "🐞" : task.type === "story" ? "📘" : "🧩"}
          <span className={styles.taskId}>{task.id}</span>
        </div>
        <h1 className={styles.taskTitle}>{task.title}</h1>
      </div>

      <p className={styles.description}>
        {task.description || "No description provided."}
      </p>

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

        {Array.isArray(task.attachments) && task.attachments.length > 0 ? (
          <div className={styles.attachments_list}>
            {task.attachments.map((att) =>
              att?.id && att?.fileName && att?.url ? (
                <AttachmentPreview
                  key={att.id}
                  id={att.id}
                  name={att.fileName}
                  url={att.url}
                  onDelete={handleDeleteAttachment}
                />
              ) : null
            )}
          </div>
        ) : (
          <p style={{ color: "#888", fontStyle: "italic" }}>
            No attachments yet. Upload one above.
          </p>
        )}
      </div>

      <ActivitySection
        comments={task.comments || []}
        worklog={task.workLogs || []}
      />
    </div>
  );
};

export default TaskDetails;
