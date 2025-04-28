import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { taskTypes, priorities, statuses } from "../../../shared/const/task";
import { sprints, users, epics } from "../../../shared/const/fakeData"; // для списків
import { Task } from "@/shared/types/task";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  type: Yup.string().required("Type is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
  epic: Yup.string(),
  sprint: Yup.string(),
  assignee: Yup.string(),
  estimate: Yup.string(),
});

type EditTaskModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (values: Partial<Task>) => void;
};

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const formik = useFormik({
    initialValues: {
      title: task.title || "",
      description: task.description || "",
      type: task.type || "",
      priority: task.priority || "",
      status: task.status || "",
      epic: task.epic || "",
      sprint: task.sprintName || "",
      assignee: task.assignee || "",
      estimate: task.estimate || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
  });

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            select
            label="Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            fullWidth
          >
            {taskTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.icon} {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Priority"
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            fullWidth
          >
            {priorities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.icon} {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            fullWidth
          >
            {statuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Epic"
            name="epic"
            value={formik.values.epic}
            onChange={formik.handleChange}
            fullWidth
          >
            {epics.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sprint"
            name="sprint"
            value={formik.values.sprint}
            onChange={formik.handleChange}
            fullWidth
          >
            {sprints.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Assignee"
            name="assignee"
            value={formik.values.assignee}
            onChange={formik.handleChange}
            fullWidth
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.name}>
                {user.avatar} {user.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Estimate (e.g., 2d 4h)"
            name="estimate"
            value={formik.values.estimate}
            onChange={formik.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save Changes</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskModal;
