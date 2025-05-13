import React from 'react';
import ActiveProjectLayout from '../../app/layouts';
import styles from './DashboardPage.module.scss';
import cardStyles from './DashboardCards.module.scss';
import { TaskCardItem } from './components/TaskCardItem';
import { DeadlineItem } from './components/DeadlineItem';
import { ProjectActivityChart } from './components/ProjectActivityChart';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const project = {};

  const tasks = [
    {
      id: 1,
      title: 'Fix header bug',
      status: 'In Progress',
      priority: 'High',
      sprint: 'Sprint 3',
    },
    {
      id: 2,
      title: 'Design login screen',
      status: 'To Do',
      priority: 'Medium',
      sprint: 'Sprint 3',
    },
    {
      id: 3,
      title: 'Code review: Sprint 3',
      status: 'Done',
      priority: 'Low',
      sprint: 'Sprint 3',
    },
  ];

  const deadlines = [
    { id: 1, title: 'Fix payment gateway', dueDate: 'Wed Apr 23 2025' },
    { id: 2, title: 'Sprint Review Meeting', dueDate: 'Thu Apr 24 2025' },
    { id: 3, title: 'Prepare presentation', dueDate: 'Fri Apr 25 2025' },
  ];

  return (
    <ActiveProjectLayout classname={styles.dashboard}>
      <h2 className={styles.heading}>test</h2>
      <p className={styles.subheading}>Test</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Project Overview</h3>
          <p>Test</p>
        </div>

        <div className={styles.card}>
          <h3>Team Members</h3>
          <p>3 total</p>
          <p>+ Maria, Oleh, Anastasia</p>
        </div>

        <div className={styles.card}>
          <h3>Current Sprint</h3>
          <p>No active sprint</p>
        </div>

        <div className={styles.card}>
          <h3>Project Progress</h3>
          <p>61% complete</p>
          <progress value="61" max="100" />
        </div>

        <div className={`${styles.card} ${styles.wide}`}>
          <h3>Upcoming Deadlines</h3>
          {deadlines.map(dl => (
            <DeadlineItem key={dl.id} title={dl.title} dueDate={dl.dueDate} />
          ))}
        </div>

        <div className={`${styles.card} ${styles.wide}`}>
          <h3>My Tasks</h3>
          {tasks.map(task => (
            <TaskCardItem
              key={task.id}
              title={task.title}
              //@ts-ignore
              status={task.status}
              //@ts-ignore
              priority={task.priority}
              sprint={task.sprint}
            />
          ))}
          <div className={styles.viewAll}><Link to="/tasks">View All</Link></div>
        </div>

        <div className={`${styles.card} ${styles.wideGraph}`}>
          <h3>Project Activity</h3>
          <ProjectActivityChart />
        </div>

        <div className={styles.card}>
          <h3>Quick Links</h3>
          <ul className={styles.links}>
            <li><Link to="/tasks">🗂 Tasks</Link></li>
            <li><Link to="/sprints">🚀 Sprints</Link></li>
            <li><Link to="/settings">⚙️ Settings</Link></li>
          </ul>
        </div>
      </div>
    </ActiveProjectLayout>
  );
};

export default DashboardPage;
