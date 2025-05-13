import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { taskTypes, priorities, statuses } from "../../../shared/const/task";
import { convertToMinutes } from "../../../shared/utils/time";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
  team: { id: string; name: string }[];
  sprints: { id: string; name: string }[];
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  type: Yup.string().required("Select task type"),
  priority: Yup.string().required("Select priority"),
  status: Yup.string().required("Select status"),
  sprint: Yup.string().nullable(),
  assignee: Yup.string().required("Select assignee"),
  estimateDays: Yup.number().min(0).nullable(),
  estimateHours: Yup.number().min(0).max(23).nullable(),
  estimateMinutes: Yup.number().min(0).max(59).nullable(),
});

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  open,
  onClose,
  onCreate,
  team,
  sprints,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Formik
        initialValues={{
          title: "",
          description: "",
          type: "",
          priority: "",
          status: "",
          sprint: "",
          assignee: "",
          estimateDays: "",
          estimateHours: "",
          estimateMinutes: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { estimateDays, estimateHours, estimateMinutes, ...rest } =
            values;

          const estimate = convertToMinutes(
            parseInt(estimateDays || "0", 10),
            parseInt(estimateHours || "0", 10),
            parseInt(estimateMinutes || "0", 10)
          );

          const payload = {
            ...rest,
            estimate,
          };

          onCreate(payload);
          resetForm();
          onClose();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <TextField
                    select
                    label="Type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                    fullWidth
                    margin="normal"
                  >
                    {taskTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Priority"
                    name="priority"
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.priority && Boolean(formik.errors.priority)
                    }
                    helperText={
                      formik.touched.priority && formik.errors.priority
                    }
                    fullWidth
                    margin="normal"
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.icon} {priority.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                    helperText={formik.touched.status && formik.errors.status}
                    fullWidth
                    margin="normal"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Sprint (optional)"
                    name="sprint"
                    value={formik.values.sprint}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="">No Sprint</MenuItem>
                    {sprints?.map((s) => (
                      <MenuItem key={s.id} value={s.name}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Assignee"
                    name="assignee"
                    value={formik.values.assignee}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.assignee && Boolean(formik.errors.assignee)
                    }
                    helperText={
                      formik.touched.assignee && formik.errors.assignee
                    }
                    fullWidth
                    margin="normal"
                  >
                    {team?.map((member) => (
                      <MenuItem key={member.id} value={member.name}>
                        {member.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box mt={2}>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}
                    >
                      Estimate (duration)
                    </div>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TextField
                          label="Days"
                          name="estimateDays"
                          type="number"
                          value={formik.values.estimateDays}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                          onBlur={formik.handleBlur}
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
                          onBlur={formik.handleBlur}
                          fullWidth
                          inputProps={{ min: 0, max: 59 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Task
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewTaskModal;
