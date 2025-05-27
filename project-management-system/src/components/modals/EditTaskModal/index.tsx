import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { taskTypes, priorities, statuses } from "../../../shared/const/task";
import { useGetTeamForProjectQuery } from "../../../api/project";
import { useGetProjectSprintsQuery } from "../../../api/sprintsApi";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { ACTIVE_PROJECT_ID } from "../../../shared/const/localStorage";
import { Task } from "../../../shared/types/task";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  type: Yup.string().required("Type is required"),
  priority: Yup.string().required("Priority is required"),
  status: Yup.string().required("Status is required"),
  sprintId: Yup.string().nullable(),
  assignee: Yup.string().required("Assignee is required"),
  estimateDays: Yup.number().min(0).nullable(),
  estimateHours: Yup.number().min(0).max(23).nullable(),
  estimateMinutes: Yup.number().min(0).max(59).nullable(),
}).test(
  "estimate-total",
  "Estimate must be at least 1 minute",
  function (values) {
    const { estimateDays, estimateHours, estimateMinutes } = values;
    const total =
      (estimateDays || 0) * 1440 +
      (estimateHours || 0) * 60 +
      (estimateMinutes || 0);
    return total > 0;
  }
);

type EditTaskModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (values: Partial<Task>) => void;
};

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const projectId =
    useAppSelector((state) => state.activeProject.activeProject?.id) ||
    localStorage.getItem(ACTIVE_PROJECT_ID);

  const { data: team = [] } = useGetTeamForProjectQuery(projectId!, {
    skip: !projectId,
  });

  const { data: sprints = [] } = useGetProjectSprintsQuery(projectId!, {
    skip: !projectId,
  });

  const estimateInMinutes = Number(task.estimate ?? 0);
  const estimateDays = Math.floor(estimateInMinutes / 1440);
  const estimateHours = Math.floor((estimateInMinutes % 1440) / 60);
  const estimateMinutes = estimateInMinutes % 60;

  const formik = useFormik({
    initialValues: {
      title: task.title || "",
      description: task.description || "",
      type: task.type || "",
      priority: task.priority || "",
      status: task.status || "",
      sprintId: task.sprint?.id || "",
      assignee:
        typeof task.assignee === "object" ? task.assignee?.id || "" : "",
      estimateDays,
      estimateHours,
      estimateMinutes,
    },
    validationSchema,
    onSubmit: (values, { setFieldError }) => {
      const totalMinutes =
        (values.estimateDays ?? 0) * 1440 +
        (values.estimateHours ?? 0) * 60 +
        (values.estimateMinutes ?? 0);

      if (totalMinutes === 0) {
        setFieldError("estimateMinutes", "Estimate must be at least 1 minute");
        return;
      }

      onSave({
        title: values.title,
        description: values.description,
        type: values.type,
        priority: values.priority,
        status: values.status,
        sprintId: values.sprintId || null,
        assignee: values.assignee || null,
        estimate: totalMinutes,
      });

      onClose();
    },
  });

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.title && formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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
            error={Boolean(formik.touched.type && formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
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
            error={Boolean(formik.touched.priority && formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
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
            error={Boolean(formik.touched.status && formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
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
            label="Sprint"
            name="sprintId"
            value={formik.values.sprintId}
            onChange={formik.handleChange}
            fullWidth
          >
            <MenuItem value="">No Sprint</MenuItem>
            {
              //@ts-ignore
              sprints.map((s: any) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))
            }
          </TextField>

          <TextField
            select
            label="Assignee"
            name="assignee"
            value={formik.values.assignee}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.assignee && formik.errors.assignee)}
            //@ts-ignore
            helperText={formik.touched.assignee && formik.errors.assignee}
            fullWidth
          >
            <MenuItem value="">Unassigned</MenuItem>
            {team.map((member) => {
              const name = `${member.user.firstName} ${member.user.lastName}`;
              return (
                <MenuItem key={member.user.id} value={member.user.id}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Days"
                name="estimateDays"
                type="number"
                value={formik.values.estimateDays}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.estimateDays)}
                helperText={formik.errors.estimateDays}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hours"
                name="estimateHours"
                type="number"
                value={formik.values.estimateHours}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.estimateHours)}
                helperText={formik.errors.estimateHours}
                fullWidth
                inputProps={{ min: 0, max: 23 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Minutes"
                name="estimateMinutes"
                type="number"
                value={formik.values.estimateMinutes}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.estimateMinutes)}
                helperText={formik.errors.estimateMinutes}
                fullWidth
                inputProps={{ min: 0, max: 59 }}
              />
            </Grid>
            {formik.errors && typeof formik.errors === "string" && (
              <Grid item xs={12}>
                <FormHelperText error>{formik.errors}</FormHelperText>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskModal;
