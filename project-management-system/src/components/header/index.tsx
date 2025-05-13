import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { clearActiveProject } from "../../store/slices/activeProjectSlice";
import { logout } from "../../store/slices/authSlice";
import { ACTIVE_PROJECT_ID } from "../../shared/const/localStorage";
import { RoutePath } from "../../shared/const/router";
import { projectApi } from "../../api/project";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

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
    dispatch(logout());
    dispatch(projectApi.util.resetApiState());
    navigate("/login");
  };

  const handleChangeProject = () => {
    localStorage.removeItem(ACTIVE_PROJECT_ID);
    dispatch(clearActiveProject());
    navigate(RoutePath.select_project);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 20px",
        background: "#1976d2",
        color: "#fff",
      }}
    >
      {isAuthenticated ? (
        <>
          <IconButton onClick={handleOpen} size="small">
            <Avatar
              sx={{ width: 36, height: 36 }}
              src={user.avatarUrl || undefined}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Box px={2} py={1}>
              <Typography fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={() => navigate("/profile")}>
              Profile Settings
            </MenuItem>
            <MenuItem onClick={() => navigate("/invites")}>
              Project Invites
            </MenuItem>
            <MenuItem onClick={handleChangeProject}>Change Project</MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </header>
  );
};

export default Header;
