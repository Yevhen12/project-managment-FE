import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    sx={{
      p: 2,
      borderRadius: 2,
      boxShadow: 2,
      backgroundColor: "#fff",
      border: "1px solid #eee",
      height: 280,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography variant="subtitle1" fontWeight={600} mb={2}>
      {title}
    </Typography>
    <Box sx={{ flexGrow: 1, minHeight: 200 }}>{children}</Box>
  </Paper>
);

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const PremiumAdminAnalytics = ({
  data,
  isLoading,
  isError,
}: {
  data: any;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) return <CircularProgress />;
  if (isError || !data) return <Typography color="error">Failed to load data</Typography>;

  const teamProductivityData = data.teamProductivity?.map((item: any) => ({
    user: item.user,
    created: item.created,
    done: item.done,
  }));

  const sprintCompletionRates = data.sprintActivity?.map((item: any) => ({
    sprint: item.name,
    rate: item.rate,
  }));

  const memberLoadData = data.memberWorkload?.map((item: any) => ({
    user: item.name,
    assigned: item.logged, // або estimated
    estimated: item.estimated,
  }));

  const overdueTasksData = data.overdueTasks;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Team Productivity">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamProductivityData}>
                <XAxis dataKey="user" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="created" fill="#8884d8" />
                <Bar dataKey="done" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Sprint Completion Rate">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sprintCompletionRates}>
                <XAxis dataKey="sprint" />
                <YAxis unit="%" />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Member Workload (minutes)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberLoadData}>
                <XAxis dataKey="user" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" fill="#90caf9" />
                <Bar dataKey="estimated" fill="#f06292" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Overdue Tasks">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overdueTasksData}
                  dataKey="overdue"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {overdueTasksData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PremiumAdminAnalytics;
