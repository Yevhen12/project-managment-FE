import React, { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Pagination,
} from "@mui/material";
import {
  useGetUserProjectsQuery,
  useCreateProjectMutation,
} from "../../api/project";
import { useNavigate } from "react-router-dom";
import styles from "./SelectProjectPage.module.scss";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { setActiveProject } from "../../store/slices/activeProjectSlice";
import Header from "../../components/header";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import { extractErrorMessage } from "../../shared/utils/errorHelpers";
import GroupIcon from "@mui/icons-material/Group";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DescriptionIcon from "@mui/icons-material/Description";
import { Project } from "../../shared/types/project";
import { ACTIVE_PROJECT_ID } from "../../shared/const/localStorage";

const SelectProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: projects = [],
    isLoading: isFetching,
    error: fetchError,
  } = useGetUserProjectsQuery();

  const [createProject, { isLoading: isCreating, error: createError }] =
    useCreateProjectMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const displayedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleSelect = (project: Project) => {
    // ✅ зберігаємо лише id
    localStorage.setItem(ACTIVE_PROJECT_ID, project.id);
    dispatch(setActiveProject(project));
    navigate("/dashboard");
  };

  const handleCreate = async (name: string, description: string) => {
    try {
      const res = await createProject({ name, description }).unwrap();
      setModalOpen(false);
      handleSelect(res);
    } catch (err) {
      // handled below
    }
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Paper className={styles.container}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight={600}>
              Select or Create Project
            </Typography>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              disabled={isCreating}
            >
              + Create Project
            </Button>
          </Box>

          {fetchError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {extractErrorMessage(fetchError, "Failed to load projects")}
            </Alert>
          )}

          {isFetching ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : projects.length === 0 ? (
            <Typography align="center" color="textSecondary" mt={4}>
              You don’t have any active projects yet. <br />
              Click <strong>+ Create Project</strong> to get started.
            </Typography>
          ) : (
            <>
              <Box className={styles.projectList}>
                {displayedProjects.map((project: Project) => {
                  const teamSize = project.teamMembers?.length || 0;
                  const sprintName = project.currentSprint?.name || "None";

                  return (
                    <Box
                      key={project.id}
                      className={styles.card}
                      onClick={() => handleSelect(project)}
                    >
                      <Box className={styles.projectInfo}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <DescriptionIcon fontSize="small" />
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {project.description}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mt={1}
                        >
                          <GroupIcon fontSize="small" />
                          Team: <strong>{teamSize}</strong>{" "}
                          {teamSize === 1 ? "member" : "members"}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <FlagIcon fontSize="small" />
                          Current Sprint: <strong>{sprintName}</strong>
                        </Typography>

                        <Typography
                          variant="body2"
                          color="textSecondary"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <VerifiedUserIcon fontSize="small" />
                          Your Role:{" "}
                          <strong style={{ textTransform: "capitalize" }}>
                            {project.myRole}
                          </strong>
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        size="small"
                        className={styles.selectBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(project);
                        }}
                      >
                        Select
                      </Button>
                    </Box>
                  );
                })}
              </Box>

              <Box className={styles.paginationWrapper}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
              </Box>
            </>
          )}
        </Paper>

        <CreateProjectModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          isLoading={isCreating}
          error={createError}
        />
      </div>
    </>
  );
};

export default SelectProjectPage;
