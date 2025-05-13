import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner";
import TaskDetails from "../../components/task/taskDetails";
import { TaskInfoCard } from "../../components/task/taskInfoCard";
import styles from "./TaskDetails.module.scss";
import ActiveProjectLayout from "../../app/layouts";
import EditTaskModal from "../../components/modals/EditTaskModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { AddAttachmentModal } from "../../components/modals/AddAttachmentModal";
import {
  useGetTaskByIdQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useAddAttachmentMutation, // 👈 додаємо хук
} from "../../api/taskApi";

const TaskDetailsPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const {
    data: task,
    isLoading,
    refetch,
  } = useGetTaskByIdQuery(taskId!, {
    skip: !taskId,
  });

  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation(); // 👈 викликаємо хук
  const [addAttachment] = useAddAttachmentMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddAttachmentOpen, setIsAddAttachmentOpen] = useState(false);

  if (isLoading || !task) {
    return <LoadingSpinner />;
  }

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleSaveTask = async (updatedTask: any) => {
    try {
      await editTask({ taskId: task.id, body: updatedTask }).unwrap();
      await refetch();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleDeleteCancel = () => setIsDeleteModalOpen(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteTask(task.id).unwrap(); // 👈 видаляємо
      navigate("/tasks"); // ✅ редірект після успіху
    } catch (err) {
      console.error("Failed to delete task", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddAttachment = () => setIsAddAttachmentOpen(true);
  const handleCloseAddAttachment = () => setIsAddAttachmentOpen(false);

  const handleSaveAttachment = async (file: File) => {
    try {
      await addAttachment({ taskId: task.id, file }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to upload attachment", err);
    }
  };

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
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
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
