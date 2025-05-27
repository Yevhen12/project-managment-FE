import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Checkbox,
  Box,
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import styles from "./CreateSprintModal.module.scss";
import { Task } from "../../../shared/types/task";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useGetTasksForProjectQuery } from "../../../api/taskApi";

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
}

export const CreateSprintModal: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
}) => {
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  )!;

  const { data: allTasks = [], isLoading } =
    useGetTasksForProjectQuery(projectId);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [taskPickerOpen, setTaskPickerOpen] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState("");

  const handleSubmit = () => {
    const hasNameError = !name.trim();
    const hasStartDateError = !startDate;
    let endDateErrorText = "";

    if (!endDate) {
      endDateErrorText = "End date is required";
    } else if (startDate && endDate.isBefore(startDate, "day")) {
      endDateErrorText = "End date cannot be before start date";
    }

    setNameError(hasNameError);
    setStartDateError(hasStartDateError);
    setEndDateError(endDateErrorText);

    if (hasNameError || hasStartDateError || endDateErrorText) return;

    onCreate({
      name,
      startDate: startDate!.format("YYYY-MM-DD"),
      endDate: endDate!.format("YYYY-MM-DD"),
      taskIds: selectedTaskIds,
    });

    onClose();
    setName("");
    setStartDate(null);
    setEndDate(null);
    setSelectedTaskIds([]);
    setNameError(false);
    setStartDateError(false);
    setEndDateError("");
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          className={styles.modal}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <h2>Create Sprint</h2>

          <TextField
            fullWidth
            label="Sprint Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setNameError(false);
            }}
            margin="dense"
            error={nameError}
            helperText={nameError ? "Sprint name is required" : ""}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              minDate={dayjs()}
              onChange={(newDate) => {
                setStartDate(newDate);
                if (newDate) setStartDateError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  error={startDateError}
                  helperText={startDateError ? "Start date is required" : ""}
                />
              )}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              minDate={startDate || dayjs()}
              onChange={(newDate) => {
                setEndDate(newDate);
                setEndDateError("");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  error={!!endDateError}
                  helperText={endDateError}
                />
              )}
            />
          </LocalizationProvider>

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
                {allTasks
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <h3>Select Tasks</h3>

          {isLoading ? (
            <Box textAlign="center" mt={2}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={allTasks}
              getOptionLabel={(option) =>
                `${option.title} (${option.id.slice(0, 6)}...)`
              }
              value={allTasks.filter((t) => selectedTaskIds.includes(t.id))}
              onChange={(_, newValue) => {
                setSelectedTaskIds(newValue.map((t) => t.id));
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  <ListItemText
                    primary={option.title}
                    secondary={option.id}
                    primaryTypographyProps={{ style: { fontSize: 14 } }}
                    secondaryTypographyProps={{ style: { fontSize: 11 } }}
                  />
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search tasks..."
                  size="small"
                />
              )}
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                ".MuiAutocomplete-listbox": {
                  maxHeight: "250px",
                  overflowY: "auto",
                },
              }}
            />
          )}

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
