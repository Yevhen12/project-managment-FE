// src/pages/selectProject/SelectProjectPage.tsx
import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { useGetProjectsQuery } from "../../api/project";
import { useNavigate } from "react-router-dom";
import styles from "./SelectProjectPage.module.scss";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { setActiveProject } from "../../store/slices/activeProjectSlice";
import { Project } from "../../shared/types/project";
import Header from "../../components/header";

const SelectProjectPage = () => {
  const dispatch = useAppDispatch();
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const navigate = useNavigate();

  const handleSelect = (projectId: string) => {
    console.log("343434");
    localStorage.setItem("activeProjectId", projectId);

    console.log(localStorage.getItem("activeProjectId")); // 🟡 Зберігаємо в localStorage
    dispatch(setActiveProject(projectId)); // 🟢 Сетаємо в Redux
    navigate("/dashboard"); // 🔵 Переходимо до дашборду
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Paper className={styles.container}>
          <Typography variant="h5" align="center" gutterBottom>
            Select a Project
          </Typography>

          {isLoading ? (
            <Typography align="center">Loading...</Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={2} mt={3}>
              {projects.map((project: Project) => (
                <Box key={project.id} className={styles.card}>
                  <Box className={styles.projectInfo}>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.description}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Team: {project.teamSize} members
                    </Typography>
                    <Typography variant="body2">
                      Current Sprint: {project.currentSprint || "None"}
                    </Typography>
                    <Typography variant="body2">
                      Your Role: <strong>{project.role}</strong>
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => handleSelect(project.id)}
                    className={styles.selectBtn}
                  >
                    Select
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </div>
    </>
  );
};

export default SelectProjectPage;
