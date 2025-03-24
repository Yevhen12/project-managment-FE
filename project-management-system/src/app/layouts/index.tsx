// src/pages/dashboard/DashboardLayout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useActiveProjectId } from '../../shared/hooks/useActiveProjectId';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  classname?:string
}

const ActiveProjectLayout: React.FC<Props> = ({ children, classname }) => {
  const projectId = useActiveProjectId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) {
      navigate('/', { replace: true });
    }
  }, [projectId, navigate]);

  if (!projectId) return null;

  return (
    <div className={classNames(classname, 'layout')}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default ActiveProjectLayout;
