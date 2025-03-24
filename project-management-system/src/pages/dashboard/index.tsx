import React, { useEffect } from 'react';
import styles from './DashboardPage.module.scss';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { setActiveProject } from '../../store/slices/activeProjectSlice';

const DashboardPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(setActiveProject(projectId));
    }
  }, [projectId]);

  if (!projectId) {
    return <Navigate to="/select-project" replace />;
  }
  
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <h2>Welcome to your dashboard 👋</h2>
          <p>Here you’ll see your projects, tasks, and progress...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
