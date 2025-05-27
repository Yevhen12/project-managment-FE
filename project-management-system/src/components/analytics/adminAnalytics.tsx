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
  CircularProgress,
} from "@mui/material";

const AnalyticsCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#333" }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

type Props = {
  data: any;
  isLoading: boolean;
  isError: boolean;
};

const AdminAnalytics = ({ data, isLoading, isError }: Props) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Typography color="error">Failed to load analytics data.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <AnalyticsCard title="Team Productivity">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Done</TableCell>
              <TableCell>Avg Time</TableCell>
              <TableCell>Overdue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.teamProductivity?.map((user: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{user.user}</TableCell>
                <TableCell>{user.created}</TableCell>
                <TableCell>{user.done}</TableCell>
                <TableCell>{user.avgTime}</TableCell>
                <TableCell>{user.overdue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnalyticsCard>

      <AnalyticsCard title="Sprint Activity">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sprint</TableCell>
              <TableCell>Added</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sprintActivity?.map((sprint: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{sprint.name}</TableCell>
                <TableCell>{sprint.added}</TableCell>
                <TableCell>{sprint.completed}</TableCell>
                <TableCell>{sprint.rate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnalyticsCard>

      <AnalyticsCard title="Longest Tasks">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Days Active</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.longestTasks?.map((task: any, i: number) => (
              <TableRow key={i}>
                <TableCell>#{task.id.slice(0, 6)}...</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.daysActive}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AnalyticsCard>

      <AnalyticsCard title="Member Workload & Risk">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Estimated</TableCell>
              <TableCell>Logged</TableCell>
              <TableCell>Risk</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.memberWorkload?.map((member: any, i: number) => {
              const risk = member.estimated === 0
                ? "-"
                : member.logged > member.estimated
                ? "🔴 High"
                : "🟢 Normal";

              return (
                <TableRow key={i}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{Math.round(member.estimated / 60)}h</TableCell>
                  <TableCell>{Math.round(member.logged / 60)}h</TableCell>
                  <TableCell>{risk}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </AnalyticsCard>
    </Box>
  );
};

export default AdminAnalytics;
