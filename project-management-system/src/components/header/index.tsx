import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { clearActiveProject } from '../../store/slices/activeProjectSlice';
import { ACTIVE_PROJECT_ID } from '../../shared/const/localStorage';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(ACTIVE_PROJECT_ID);
    dispatch(clearActiveProject());
    // Можна також очистити токен, користувача і т.д.
    navigate('/login');
  };

  const handleChangeProject = () => {
    localStorage.removeItem(ACTIVE_PROJECT_ID);
    dispatch(clearActiveProject());
    navigate('/');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', background: '#1976d2', color: '#fff' }}>
      <IconButton onClick={handleOpen} size="small">
        <Avatar sx={{ width: 36, height: 36 }}>YL</Avatar>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <Box px={2} py={1}>
          <Typography fontWeight={600}>Yevhen Lys</Typography>
          <Typography variant="body2" color="text.secondary">epsonn537@gmail.com</Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => navigate('/profile')}>Profile Settings</MenuItem>
        <MenuItem onClick={() => navigate('/invites')}>Project Invites</MenuItem>
        <MenuItem onClick={handleChangeProject}>Change Project</MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
