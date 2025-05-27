// src/pages/SubscriptionPage.tsx
import React from "react";
import { Box, Typography, Paper, Button, Grid, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCreateStripeSessionMutation } from "../../api/paymentsApi";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [createSession, { isLoading }] = useCreateStripeSessionMutation();

  const handleSubscribe = async () => {
    try {
      const res = await createSession().unwrap();
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (error: any) {
      alert(error?.data?.message || "Failed to initiate checkout");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 720,
          p: 4,
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Button
          size="small"
          onClick={() => navigate('/dashboard')}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            textTransform: "none",
          }}
        >
          ← Go back
        </Button>

        <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
          🔒 Subscribe to Premium
        </Typography>

        <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
          Premium access unlocks deeper analytics, more insights, and full control over your project’s performance.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              What's included:
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {[
                "Advanced project analytics",
                "Team productivity charts",
                "Time estimation vs actual reports",
                "Personal task statistics",
              ].map((text, index) => (
                <Box key={index} display="flex" alignItems="center" gap={1}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2">{text}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
                9.99₴
              </Typography>
              <Typography variant="body2" mb={2}>
                per month, no hidden fees
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubscribe}
                disabled={isLoading}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Subscribe now"}
              </Button>
              <Typography variant="caption" display="block" mt={1} color="text.secondary">
                Cancel anytime
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SubscriptionPage;
