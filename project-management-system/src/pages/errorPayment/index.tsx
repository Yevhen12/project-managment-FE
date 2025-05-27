// src/pages/SubscriptionCancelPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SubscriptionCancelPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: 2,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <CancelOutlined color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Subscription Cancelled
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Your payment process was cancelled. You can upgrade anytime from the header or analytics section.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/subscription")}>
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriptionCancelPage;
