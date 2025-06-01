import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";

const STATUS_COLORS: Record<string, string> = {
  TO_DO: "#42a5f5", 
  IN_PROGRESS: "#ffb74d", 
  DONE: "#66bb6a",
  REVIEW: "#9575cd", 
  QA_READY: "#f06292", 
  QA_TESTING: "#26c6da",
  DEFAULT: "#90a4ae",
};

type TaskStatusChartProps = {
  data: Record<string, number>;
};

const TaskStatusChart: React.FC<TaskStatusChartProps> = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([key, value]) => ({ name: key, value }))
    .filter((d) => d.value > 0);

  if (chartData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Typography variant="body2" color="text.secondary">
          No data to show
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  STATUS_COLORS[entry.name.toUpperCase()] ||
                  STATUS_COLORS.DEFAULT
                }
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TaskStatusChart;
