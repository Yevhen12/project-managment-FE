// src/pages/SubscriptionSuccessPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SubscriptionSuccessPage = () => {
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
        <CheckCircleOutline color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Subscription Successful!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Thank you for upgrading. Premium features are now unlocked for your account.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriptionSuccessPage;
