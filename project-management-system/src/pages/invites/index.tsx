import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
  Alert,
  Pagination,
  IconButton,
} from "@mui/material";
import {
  Group as GroupIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import styles from "./InvitesPage.module.scss";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import {
  useApproveInviteMutation,
  useDeclineInviteMutation,
  useGetInvitesPendingUserQuery,
} from "../../api/project";

const InvitesPage = () => {
  const navigate = useNavigate();

  const {
    data: invites = [],
    isLoading,
    error,
    refetch,
  } = useGetInvitesPendingUserQuery();

  const [approveInvite, { isLoading: isAccepting }] = useApproveInviteMutation();
  const [declineInvite, { isLoading: isDeclining }] = useDeclineInviteMutation();

  const [page, setPage] = useState(1);
  const invitesPerPage = 2;

  const totalPages = Math.ceil(invites.length / invitesPerPage);
  const displayedInvites = invites.slice(
    (page - 1) * invitesPerPage,
    page * invitesPerPage
  );

  const handleAccept = async (id: string) => {
    try {
      await approveInvite(id).unwrap();
      await refetch();
    } catch (e) {
      console.error("Failed to approve invite", e);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      await declineInvite(id).unwrap();
      await refetch();
    } catch (e) {
      console.error("Failed to decline invite", e);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight={600}>
            Your Invitations 📬
          </Typography>
        </Box>

        <Typography variant="subtitle1" align="center" color="textSecondary" mb={3}>
          Accept or decline the invitations below to join projects
        </Typography>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Failed to load invitations</Alert>
        ) : invites.length === 0 ? (
          <Box className={styles.emptyState}>
            <img
              src="/images/no-invites.svg"
              alt="No invitations"
              className={styles.emptyImage}
            />
            <Typography variant="h6" mt={2}>
              You're all caught up! 🎉
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You currently have no pending invitations.
            </Typography>
          </Box>
        ) : (
          <>
            <Box display="flex" flexDirection="column" gap={3}>
              {displayedInvites.map((invite) => (
                <Paper key={invite.id} className={styles.inviteCard}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="h6">{invite.project.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        You have been invited as a {invite.role}.
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      {invite.project.name[0]}
                    </Avatar>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box className={styles.details}>
                    <Box className={styles.detailItem}>
                      <PersonIcon fontSize="small" />
                      <span>
                        <strong>From:</strong> {invite.createdBy.name} ({invite.createdBy.email})
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
                        {new Date(invite.createdAt).toLocaleDateString("en-GB")}
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
                      disabled={isAccepting}
                    >
                      {isAccepting ? "Accepting..." : "ACCEPT"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDecline(invite.id)}
                      disabled={isDeclining}
                    >
                      {isDeclining ? "Declining..." : "DECLINE"}
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default InvitesPage;
