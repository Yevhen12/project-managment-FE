// src/pages/AnalyticsPage.tsx

import React, { useState } from "react";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";
import ActiveProjectLayout from "../../app/layouts";
import { useAppSelector } from "../../shared/hooks/useAppSelector";

import AdminAnalytics from "../../components/analytics/adminAnalytics";
import DeveloperAnalytics from "../../components/analytics/developerAnalytics";

import PremiumDeveloperAnalytics from "../../components/analytics/premiumDeveloperAnalytics";
import PremiumAdminAnalytics from "../../components/analytics/premiumAdminAnalytics";

import PremiumOverlay from "../../components/analytics/premiumOverlay";
import { useGetAdminAnalyticsQuery } from "../../api/analytics";

const AnalyticsPage = () => {
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  );
  const userId = useAppSelector((state) => state.auth.user?.id);
  const role = useAppSelector(
    (state) => state.activeProject.activeProject?.myRole
  );
  const hasPremium = useAppSelector((state) => state.auth.user?.isPremium);

  const [tab, setTab] = useState(0);

  const {
    data: analyticsData,
    isLoading,
    isError,
  } = useGetAdminAnalyticsQuery(projectId!, {
    skip: !projectId,
    refetchOnMountOrArgChange: true,
  });

  const renderStandardAnalytics = () => {
    if (role === "admin") {
      return (
        <AdminAnalytics
          data={analyticsData}
          isLoading={isLoading}
          isError={isError}
        />
      );
    }
    return (
      <DeveloperAnalytics
        data={analyticsData}
        isLoading={isLoading}
        isError={isError}
      />
    );
  };

  const renderPremiumAnalytics = () => {
    if (role === "admin") {
      return (
        <PremiumAdminAnalytics
          data={analyticsData}
          isLoading={isLoading}
          isError={isError}
        />
      );
    }
    return (
      <PremiumDeveloperAnalytics
        data={analyticsData}
        isLoading={isLoading}
        isError={isError}
      />
    );
  };

  return (
    <ActiveProjectLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, newTab) => setTab(newTab)}
          sx={{ mb: 2 }}
        >
          <Tab label="Standard" />
          <Tab label="Premium" />
        </Tabs>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            p: 3,
            maxHeight: "69vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #f0f0f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            position: "relative",
          }}
        >
          {tab === 0 ? (
            renderStandardAnalytics()
          ) : hasPremium ? (
            renderPremiumAnalytics()
          ) : (
            <>
              <Box sx={{ filter: "blur(2px)", pointerEvents: "none" }}>
                {renderPremiumAnalytics()}
              </Box>
              <PremiumOverlay />
            </>
          )}
        </Paper>
      </Box>
    </ActiveProjectLayout>
  );
};

export default AnalyticsPage;
