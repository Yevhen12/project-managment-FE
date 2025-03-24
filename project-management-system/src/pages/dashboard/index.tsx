import React from "react";
import { useActiveProjectData } from "../../shared/hooks/useActiveProjectData";
import ActiveProjectLayout from "../../app/layouts";
import styles from './DashboardPage.module.scss';
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { selectActiveProjectData } from "../../shared/selectors";

const DashboardPage = () => {
  const projectData = useActiveProjectData();
    const project = useAppSelector(selectActiveProjectData);

  console.log(localStorage)
  console.log({ projectData, project });
  return (
    <ActiveProjectLayout classname={styles.dashboard}>
      <div>
        <h2>Welcome to your dashboard 👋</h2>
        <p>Here you’ll see your projects, tasks, and progress...</p>
      </div>
    </ActiveProjectLayout>
  );
};

export default DashboardPage;
