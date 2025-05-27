// components/analytics/ChartCard.tsx
import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
        mb: 3,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        {title}
      </Typography>
      <Box height={250}>{children}</Box>
    </Paper>
  );
};

export default ChartCard;
