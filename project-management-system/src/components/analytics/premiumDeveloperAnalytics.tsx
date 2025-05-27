import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Alert,
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
  noData = false,
}: {
  title: string;
  children?: React.ReactNode;
  noData?: boolean;
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
      ...(noData
        ? {
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }
        : {}),
    }}
  >
    {!noData && (
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mb={2}
        alignSelf="flex-start"
      >
        {title}
      </Typography>
    )}
    {noData ? (
      <Typography variant="body2" color="text.secondary">
        No data to show
      </Typography>
    ) : (
      <Box sx={{ flexGrow: 1, minHeight: 200, width: "100%" }}>{children}</Box>
    )}
  </Paper>
);

const PremiumDeveloperAnalytics = ({
  data,
  isLoading,
  isError,
}: {
  data: any;
  isLoading: boolean;
  isError: boolean;
}) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  if (isLoading) return <CircularProgress />;
  if (isError || !data)
    return <Alert severity="error">Не вдалося завантажити аналітику</Alert>;

  const estimateLoggedData =
    data.estimateVsLogged?.map((item: any) => ({
      task: item.taskId?.slice(0, 8) + "...",
      estimate: item.estimate,
      logged: item.logged,
    })) || [];

  const sprintProgressData = data.mySprintProgress
    ? [
        {
          sprint: data.mySprintProgress.sprintName,
          assigned: data.mySprintProgress.assigned,
          done: data.mySprintProgress.done,
          inProgress: data.mySprintProgress.inProgress,
        },
      ]
    : [];

  const rawPriorityData = Object.entries(data.priorityDistribution || {}).map(
    ([name, value]) => ({ name, value: Number(value) })
  );
  const priorityData = rawPriorityData.filter((item) => item.value > 0);
  const isPriorityEmpty = priorityData.length === 0;

  const rawStatusData = Object.entries(data.statusBreakdown || {}).map(
    ([name, value]) => ({ name, value: Number(value) })
  );
  const statusData = rawStatusData.filter((item) => item.value > 0);
  const isStatusEmpty = statusData.length === 0;

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        У вас немає прав для перегляду повної аналітики. Зверніться до
        адміністратора проєкту для отримання доступу.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Estimate vs Logged Time"
            noData={estimateLoggedData.length === 0}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={estimateLoggedData}>
                <XAxis dataKey="task" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="estimate" fill="#8884d8" />
                <Bar dataKey="logged" fill="#ff7f50" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard
            title="Sprint Progress"
            noData={sprintProgressData.length === 0}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sprintProgressData}>
                <XAxis dataKey="sprint" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" fill="#90caf9" />
                <Bar dataKey="done" fill="#4caf50" />
                <Bar dataKey="inProgress" fill="#fbc02d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard
            title="Task Priority Distribution"
            noData={isPriorityEmpty}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {priorityData.map((entry, index) => (
                    <Cell
                      key={`cell-priority-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Task Status Breakdown" noData={isStatusEmpty}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-status-${index}`}
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

export default PremiumDeveloperAnalytics;
