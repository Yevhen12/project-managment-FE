import React from "react";
import ActiveProjectLayout from "../../app/layouts";
import styles from "./DashboardPage.module.scss";
import { TaskCardItem } from "./components/TaskCardItem";
import { Link } from "react-router-dom";
import TaskStatusChart from "./components/TaskStatusChart";
import AssignedTaskTypesChart from "./components/AssignedTaskTypesChart";
import PremiumOverlay from "../../components/analytics/premiumOverlay";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import {
  useGetProjectQuery,
  useGetTeamForProjectQuery,
} from "../../api/project";
import { useGetActiveSprintQuery } from "../../api/sprintsApi";
import { useGetTasksForProjectQuery } from "../../api/taskApi";

const DashboardPage = () => {
  const isPremium = useAppSelector((state) => state.auth.user?.isPremium);
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  );

  const { data: project } = useGetProjectQuery(projectId!, {
    skip: !projectId,
  });
  const { data: activeSprint } = useGetActiveSprintQuery(projectId!, {
    skip: !projectId,
  });
  const { data: tasks = [] } = useGetTasksForProjectQuery(projectId!, {
    skip: !projectId,
  });
  const { data: team = [] } = useGetTeamForProjectQuery(projectId!, {
    skip: !projectId,
  });

  const statusSummary = tasks.reduce((acc: Record<string, number>, task) => {
    const key = task.status || "Other";
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  const typeSummary = tasks.reduce((acc: Record<string, number>, task) => {
    const key = task.type || "Other";
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  const renderWithOverlay = (content: React.ReactNode) => (
    <div style={{ position: "relative" }}>
      <div
        style={{
          filter: isPremium ? "none" : "blur(4px)",
          pointerEvents: isPremium ? "auto" : "none",
          transition: "0.3s ease",
        }}
      >
        {content}
      </div>
      {!isPremium && (
        <div className={styles.overlay}>
          <PremiumOverlay />
        </div>
      )}
    </div>
  );

  return (
    <ActiveProjectLayout classname={styles.dashboard}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>{project?.name || "Project"}</h2>
        <p className={styles.subheading}>
          {project?.description || "No description"}
        </p>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.third}`}>
            <h3>Project Overview</h3>
            <p>{project?.name || "No name"}</p>
          </div>

          <div className={`${styles.card} ${styles.third}`}>
            <h3>Team Members</h3>
            <p>{team.length} total</p>
            <p>
              {team
                .map((member: any) => member.user?.firstName)
                .filter(Boolean)
                .slice(0, 3)
                .join(", ") || "-"}
            </p>
          </div>

          <div className={`${styles.card} ${styles.third}`}>
            <h3>Current Sprint</h3>
            <p>{activeSprint?.name || "No active sprint"}</p>
          </div>

          <div className={`${styles.card} ${styles.half}`}>
            <h3>Task Status Overview</h3>
            {renderWithOverlay(<TaskStatusChart data={statusSummary} />)}
          </div>

          <div className={`${styles.card} ${styles.half}`}>
            <h3>Assigned Task Types</h3>
            {renderWithOverlay(<AssignedTaskTypesChart data={typeSummary} />)}
          </div>

          <div className={`${styles.card} ${styles.half}`}>
            <h3>Tasks</h3>
            {tasks.slice(0, 3).map((task) =>
              task?.title ? (
                <TaskCardItem
                  key={task.id}
                  title={task.title}
                  //@ts-ignore
                  status={task.status}
                  //@ts-ignore
                  priority={task.priority}
                  sprint={task.sprint?.name || "No Sprint"}
                />
              ) : null
            )}
            <div className={styles.viewAll}>
              <Link to="/tasks">View All</Link>
            </div>
          </div>

          <div className={`${styles.card} ${styles.half}`}>
            <h3>Quick Links</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/tasks">🗂 Tasks</Link>
              </li>
              <li>
                <Link to="/sprints">🚀 Sprints</Link>
              </li>
              <li>
                <Link to="/settings">⚙️ Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ActiveProjectLayout>
  );
};

export default DashboardPage;
