import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  Activity,
  Users,
  BarChart,
  Settings,
  Archive,
  LogOut,
} from "lucide-react";
import styles from "./Sidebar.module.scss";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { clearActiveProject } from "../../store/slices/activeProjectSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeProject = () => {
    localStorage.removeItem("activeProjectId");
    dispatch(clearActiveProject());
    navigate("/select-project");
  };

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={16} />, to: "/dashboard" },
    { label: "Tasks", icon: <ListChecks size={16} />, to: "/tasks" },
    { label: "Sprints", icon: <Activity size={16} />, to: "/sprints" },
    { label: "Team", icon: <Users size={16} />, to: "/team" },
    { label: "Analytics", icon: <BarChart size={16} />, to: "/analytics" },
    { label: "Archive", icon: <Archive size={16} />, to: "/archive" },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.label}</span>
          </NavLink>
        ))}
      </div>
      <button onClick={handleChangeProject} className={styles.changeBtn}>
        <LogOut size={16} />
        <span>Change Project</span>
      </button>
    </div>
  );
};

export default Sidebar;
