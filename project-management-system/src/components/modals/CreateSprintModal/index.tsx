import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import styles from "./CreateSprintModal.module.scss";
import { Task } from "../../../shared/types/task";

interface SprintInfo {
  name: string;
  startDate: string;
  endDate: string;
  taskIds: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: SprintInfo) => void;
  tasks: Task[];
}

export const CreateSprintModal: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
  tasks,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [taskPickerOpen, setTaskPickerOpen] = useState(false);
  const [taskSearch, setTaskSearch] = useState("");

  const handleTaskToggle = (taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = () => {
    if (!name || !startDate || !endDate) return;
    onCreate({
      name,
      startDate,
      endDate,
      taskIds: selectedTaskIds,
    });
    onClose();
    setName("");
    setStartDate("");
    setEndDate("");
    setSelectedTaskIds([]);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box className={styles.modal}>
          <h2>Create Sprint</h2>

          <TextField
            fullWidth
            label="Sprint Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Start Date"
            placeholder="dd.mm.yyyy"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            margin="dense"
          />

          <TextField
            fullWidth
            label="End Date"
            placeholder="dd.mm.yyyy"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            margin="dense"
          />

          <Button
            variant="outlined"
            onClick={() => setTaskPickerOpen(true)}
            sx={{ mt: 1 }}
          >
            Select Tasks
          </Button>

          {selectedTaskIds.length > 0 && (
            <div className={styles.selectedTasks}>
              <strong>Selected Tasks:</strong>
              <ul>
                {tasks
                  .filter((t) => selectedTaskIds.includes(t.id))
                  .map((task) => (
                    <li key={task.id}>
                      {task.id} — {task.title}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={taskPickerOpen} onClose={() => setTaskPickerOpen(false)}>
        <Box className={styles.taskPickerModal}>
          <h3>Select Tasks</h3>

          <TextField
            fullWidth
            size="small"
            placeholder="Search tasks..."
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            sx={{ mb: 1 }}
          />

          <div className={styles.taskList}>
            {tasks
              .filter((t) =>
                t.title.toLowerCase().includes(taskSearch.toLowerCase())
              )
              .map((task) => (
                <FormControlLabel
                  key={task.id}
                  control={
                    <Checkbox
                      checked={selectedTaskIds.includes(task.id)}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                  }
                  label={`${task.id} — ${task.title}`}
                />
              ))}
          </div>

          <Button
            fullWidth
            variant="contained"
            size="small"
            sx={{ mt: 2 }}
            onClick={() => setTaskPickerOpen(false)}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </>
  );
};
