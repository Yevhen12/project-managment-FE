import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Grid, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { taskTypes, priorities, statuses } from "../../../shared/const/task";
import { users, sprints, epics } from "../../../shared/const/fakeData";

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: any) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  type: Yup.string().required("Select task type"),
  priority: Yup.string().required("Select priority"),
  status: Yup.string().required("Select status"),
  epic: Yup.string().required("Select epic"),
  sprint: Yup.string().required("Select sprint"),
  assignee: Yup.string().required("Select assignee"),
  estimate: Yup.string(),
});

const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onClose, onCreate }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Formik
        initialValues={{
          title: "",
          description: "",
          type: "",
          priority: "",
          status: "",
          epic: "",
          sprint: "",
          assignee: "",
          estimate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onCreate(values);
          resetForm();
          onClose();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                {/* LEFT SIDE */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Title"
                    name="title"
                    placeholder="Enter task title"
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
                    placeholder="Short description..."
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
                    <MenuItem value="" disabled>
                      Select type
                    </MenuItem>
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
                    error={formik.touched.priority && Boolean(formik.errors.priority)}
                    helperText={formik.touched.priority && formik.errors.priority}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="" disabled>
                      Select priority
                    </MenuItem>
                    {priorities.map((priority) => (
                      <MenuItem key={priority.value} value={priority.value}>
                        {priority.icon} {priority.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* RIGHT SIDE */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="" disabled>
                      Select status
                    </MenuItem>
                    {statuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Epic"
                    name="epic"
                    value={formik.values.epic}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.epic && Boolean(formik.errors.epic)}
                    helperText={formik.touched.epic && formik.errors.epic}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="" disabled>
                      Select epic
                    </MenuItem>
                    {epics.map((epic) => (
                      <MenuItem key={epic.value} value={epic.value}>
                        {epic.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Sprint"
                    name="sprint"
                    value={formik.values.sprint}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sprint && Boolean(formik.errors.sprint)}
                    helperText={formik.touched.sprint && formik.errors.sprint}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="" disabled>
                      Select sprint
                    </MenuItem>
                    {sprints.map((sprint) => (
                      <MenuItem key={sprint.value} value={sprint.value}>
                        {sprint.label}
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
                    error={formik.touched.assignee && Boolean(formik.errors.assignee)}
                    helperText={formik.touched.assignee && formik.errors.assignee}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="" disabled>
                      Select assignee
                    </MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        <span style={{ marginRight: 8 }}>{user.avatar}</span> {user.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Estimate (e.g. 2d 4h)"
                    name="estimate"
                    placeholder="2d 4h"
                    value={formik.values.estimate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="normal"
                  />
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
