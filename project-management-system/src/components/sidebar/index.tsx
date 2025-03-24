import React from 'react';
import styles from './Sidebar.module.scss';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <List>
        <ListItemButton component={RouterLink} to="/projects">
          <ListItemText primary="Projects" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/tasks">
          <ListItemText primary="Tasks" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/sprints">
          <ListItemText primary="Sprints" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/analytics">
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/settings">
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
