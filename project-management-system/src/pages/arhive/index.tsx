// src/pages/ArchivePage.tsx

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActiveProjectLayout from "../../app/layouts";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { useGetCompletedSprintsQuery } from "../../api/sprintsApi";
import styles from "./ArchivePage.module.scss";
import { format } from "date-fns";
import TaskRow from "../tasks/TaskRow";

export const ArchivePage = () => {
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  );

  const { data: sprints, isLoading } = useGetCompletedSprintsQuery(projectId!, {
    skip: !projectId,
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAccordionToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <ActiveProjectLayout>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Archived Sprints</h1>

        {isLoading ? (
          <div className={styles.loadingWrapper}>
            <CircularProgress />
          </div>
        ) : !sprints?.length ? (
          <Typography>No completed sprints found.</Typography>
        ) : (
          sprints.map((sprint: any) => (
            <Accordion
              key={sprint.id}
              expanded={expandedId === sprint.id}
              onChange={() => handleAccordionToggle(sprint.id)}
              className={styles.sprintCard}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className={styles.sprintHeader}>
                  <Typography variant="h6" className={styles.sprintName}>
                    {sprint.name}
                  </Typography>
                  <Typography variant="body2" className={styles.dateRange}>
                    {format(new Date(sprint.startDate), "yyyy-MM-dd")} –{" "}
                    {format(new Date(sprint.endDate), "yyyy-MM-dd")}
                  </Typography>
                </div>
              </AccordionSummary>

              <AccordionDetails className={styles.taskList}>
                {!sprint.tasks?.length ? (
                  <Typography variant="body2">No tasks in this sprint.</Typography>
                ) : (
                  <>
                    {sprint.tasks.map((task: any, index: number) => (
                      <React.Fragment key={task.id}>
                        <TaskRow task={task} />
                        {index < sprint.tasks.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>
    </ActiveProjectLayout>
  );
};
