import React from "react";
import { Box, Button, Paper, Typography, Divider, Avatar } from "@mui/material";
import {
  Group as GroupIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import styles from "./InvitesPage.module.scss";
import Header from "../../components/header";

const mockInvites = [
  {
    id: "1",
    projectName: "Project Alpha",
    description: "You have been invited as a developer.",
    senderName: "Olena Hryn",
    senderEmail: "olena.hryn@example.com",
    role: "Developer",
    sentAt: "2025-03-20T10:15:00Z",
    teamSize: 5,
    currentSprint: "Sprint 3",
  },
  {
    id: "2",
    projectName: "Project Beta",
    description: "You have been invited as an admin.",
    senderName: "Dmytro Sokolov",
    senderEmail: "d.sokolov@example.com",
    role: "Admin",
    sentAt: "2025-03-18T15:42:00Z",
    teamSize: 12,
    currentSprint: "Sprint 7",
  },
  {
    id: "2",
    projectName: "Project Beta",
    description: "You have been invited as an admin.",
    senderName: "Dmytro Sokolov",
    senderEmail: "d.sokolov@example.com",
    role: "Admin",
    sentAt: "2025-03-18T15:42:00Z",
    teamSize: 12,
    currentSprint: "Sprint 7",
  },
];

const InvitesPage = () => {
  const handleAccept = (id: string) => {
    console.log(`Accepted invite ${id}`);
  };

  const handleDecline = (id: string) => {
    console.log(`Declined invite ${id}`);
  };

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
          Your Invitations 📬
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Accept or decline the invitations below to join projects
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {mockInvites.map((invite) => (
            <Paper key={invite.id} className={styles.inviteCard}>
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{invite.projectName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {invite.description}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {invite.projectName[0]}
                </Avatar>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box className={styles.details}>
                <Box className={styles.detailItem}>
                  <PersonIcon fontSize="small" />
                  <span>
                    <strong>From:</strong> {invite.senderName} (
                    {invite.senderEmail})
                  </span>
                </Box>

                <Box className={styles.detailItem}>
                  <InfoIcon fontSize="small" />
                  <span>
                    <strong>Role:</strong> {invite.role}
                  </span>
                </Box>

                <Box className={styles.detailItem}>
                  <CalendarIcon fontSize="small" />
                  <span>
                    <strong>Sent:</strong>{" "}
                    {new Date(invite.sentAt).toLocaleDateString("en-GB")}
                  </span>
                </Box>

                <Box className={styles.detailItem}>
                  <GroupIcon fontSize="small" />
                  <span>
                    <strong>Team Size:</strong> {invite.teamSize}
                  </span>
                </Box>

                <Box className={styles.detailItem}>
                  <InfoIcon fontSize="small" />
                  <span>
                    <strong>Current Sprint:</strong>{" "}
                    {invite.currentSprint || "Not started"}
                  </span>
                </Box>
              </Box>

              <Box mt={2} display="flex" gap={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(invite.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDecline(invite.id)}
                >
                  Decline
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </div>
    </>
  );
};

export default InvitesPage;
