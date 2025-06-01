import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../shared/const/router";

const PremiumOverlay = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(RoutePath.subscription);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={1}>
        Premium analytics access is restricted
      </Typography>
      <Typography variant="body2" mb={2}>
        Subscribe to unlock detailed project insights and visual charts.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Upgrade to Premium
      </Button>
    </Box>
  );
};

export default PremiumOverlay;
