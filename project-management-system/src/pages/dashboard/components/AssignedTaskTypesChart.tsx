import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Box, Typography } from '@mui/material';

const COLORS = ['#26c6da', '#ff7043', '#ab47bc', '#9ccc65', '#ffa726'];


const AssignedTaskTypesChart = ({
  data,
}: {
  data: Record<string, number>;
}) => {
  const chartData = Object.entries(data)
    .map(([key, value]) => ({ name: key, value }))
    .filter((d) => d.value > 0);

  if (chartData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
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
                key={`cell-type-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AssignedTaskTypesChart;
