import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";

const ScrollableCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 3,
      boxShadow: 4,
      border: "1px solid #e0e0e0",
      backgroundColor: "#fff",
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
      {title}
    </Typography>
    {children}
  </Paper>
);

const DeveloperAnalytics = ({
  data,
  isLoading,
  isError,
}: {
  data: any;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Alert severity="error">Не вдалося завантажити аналітику</Alert>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Alert severity="info">
        У вас немає прав для перегляду повної аналітики. Зверніться до адміністратора проєкту для отримання доступу.
      </Alert>

      <ScrollableCard title="My Tasks">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Estimate</TableCell>
              <TableCell>Logged Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.myTasks.map((task: any) => (
              <TableRow key={task.title}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.estimate}m</TableCell>
                <TableCell>{task.loggedTime}m</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableCard>

      <ScrollableCard title="My Sprint Progress">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sprint</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Done</TableCell>
              <TableCell>In Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.mySprintProgress ? (
              <TableRow>
                <TableCell>{data.mySprintProgress.sprintName}</TableCell>
                <TableCell>{data.mySprintProgress.assigned}</TableCell>
                <TableCell>{data.mySprintProgress.done}</TableCell>
                <TableCell>{data.mySprintProgress.inProgress}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No active sprint</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollableCard>

      <ScrollableCard title="Estimate vs Logged Time">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Task ID</TableCell>
              <TableCell>Estimate (m)</TableCell>
              <TableCell>Logged (m)</TableCell>
              <TableCell>Diff (m)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.estimateVsLogged.map((item: any) => (
              <TableRow key={item.taskId}>
                <TableCell>{item.taskId.slice(0, 8)}...</TableCell>
                <TableCell>{item.estimate}</TableCell>
                <TableCell>{item.logged}</TableCell>
                <TableCell>{item.diff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollableCard>
    </Box>
  );
};

export default DeveloperAnalytics;
