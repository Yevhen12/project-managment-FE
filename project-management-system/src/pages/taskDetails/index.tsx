import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockTasks } from "../../shared/const/mockTasks";
import LoadingSpinner from "../../components/loadingSpinner";
import TaskDetails from "../../components/task/taskDetails";
import { TaskInfoCard } from "../../components/task/taskInfoCard";
import styles from "./TaskDetails.module.scss";
import ActiveProjectLayout from "../../app/layouts";
import { Attachment, Task } from "../../shared/types/task";
import EditTaskModal from "../../components/modals/EditTaskModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { AddAttachmentModal } from "../../components/modals/AddAttachmentModal";

const TaskDetailsPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddAttachmentOpen, setIsAddAttachmentOpen] = useState(false);

  const navigate = useNavigate();

  const task = mockTasks.find((t) => t.id === taskId);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveTask = (updatedTask: Partial<Task>) => {
    console.log("Оновлена таска:", updatedTask);
    setIsEditModalOpen(false);
    // тут потім можна ще локально оновити відображення таски
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Тут логіка видалення задачі (поки можемо просто console.log або з масиву видалити)
    console.log("Task deleted!");
    setIsDeleteModalOpen(false);
    navigate("/tasks"); // Перекинути користувача назад на список задач
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleAddAttachment = () => setIsAddAttachmentOpen(true);
  const handleCloseAddAttachment = () => setIsAddAttachmentOpen(false);

  const handleSaveAttachment = (newAttachment: Partial<Attachment>) => {
    console.log("handle save attachment", newAttachment);
    // setTask((prev) => ({
    //   ...prev,
    //   attachments: [
    //     ...(prev.attachments || []),
    //     { ...newAttachment, id: Date.now().toString() },
    //   ],
    // }));
  };

  if (!task) {
    return <LoadingSpinner />;
  }

  return (
    <ActiveProjectLayout>
      <div className={styles.taskPage}>
        <div className={styles.left}>
          <TaskDetails task={task} handleAddAttachment={handleAddAttachment} />
        </div>
        <div className={styles.right}>
          <TaskInfoCard
            task={task}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          onClose={handleCloseEditModal}
          onSave={handleSaveTask}
        />
      )}
      {isDeleteModalOpen && (
        <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
          <DialogTitle
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Confirm Deletion
          </DialogTitle>
          <DialogContent
            style={{
              padding: "20px",
              fontSize: "16px",
              color: "#555",
              backgroundColor: "#fff0f1",
            }}
          >
            Are you sure you want to permanently delete this task? This action
            cannot be undone.
          </DialogContent>
          <DialogActions
            style={{ backgroundColor: "#fff0f1", padding: "16px" }}
          >
            <Button
              onClick={handleDeleteCancel}
              variant="outlined"
              style={{
                borderColor: "#ccc",
                color: "#333",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              style={{
                backgroundColor: "#d32f2f",
                color: "#fff",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <AddAttachmentModal
        open={isAddAttachmentOpen}
        onClose={handleCloseAddAttachment}
        onAdd={handleSaveAttachment}
      />
    </ActiveProjectLayout>
  );
};

export default TaskDetailsPage;
