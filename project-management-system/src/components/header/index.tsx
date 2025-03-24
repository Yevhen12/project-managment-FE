import React from 'react';
import styles from './Header.module.scss';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo}>
          Project Manager
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
