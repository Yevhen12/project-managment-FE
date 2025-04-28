import { useEffect, useState } from "react";
import styles from "../ActivitySection.module.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Іконка годинника

type WorkLogEntry = {
  id: number;
  user: string;
  timeSpent: string;
  date: string;
};

export const WorkLog = () => {
  const [workLogs, setWorkLogs] = useState<WorkLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWorkLogs([
        { id: 1, user: "Dhiraj Chore", timeSpent: "30m", date: "23 квітня 2025" },
        { id: 2, user: "Dhiraj Chore", timeSpent: "30m", date: "22 квітня 2025" },
        { id: 3, user: "Oleksandr Nazarenko", timeSpent: "3h", date: "25 лютого 2025" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading work logs...</div>;
  }

  return (
    <div className={styles.worklog}>
      {workLogs.map((log) => (
        <div key={log.id} className={styles.worklogItem}>
          <div className={styles.avatar}>
            {log.user.charAt(0).toUpperCase()}
          </div>
          <div className={styles.details}>
            <div className={styles.userName}>{log.user}</div>
            <div className={styles.timeInfo}>
              <AccessTimeIcon fontSize="small" className={styles.timeIcon} />
              {log.timeSpent} — {log.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
