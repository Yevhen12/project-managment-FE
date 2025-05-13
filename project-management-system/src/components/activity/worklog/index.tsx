import styles from "../ActivitySection.module.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface WorkLogEntry {
  id: string;
  timeSpent: number;
  workDate: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar?: string | null;
  };
}

interface WorkLogProps {
  worklog: WorkLogEntry[];
}

const formatTimeSpent = (minutes: number): string => {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins || parts.length === 0) parts.push(`${mins}m`);

  return parts.join(" ");
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export const WorkLog = ({ worklog }: WorkLogProps) => {
  const getInitials = (firstName = "", lastName = "") =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className={styles.worklog}>
      {worklog.map((log) => (
        <div key={log.id} className={styles.worklogItem}>
          <div className={styles.avatar}>
            {getInitials(log.user?.firstName, log.user?.lastName)}
          </div>
          <div className={styles.details}>
            <div className={styles.userName}>
              {log.user?.firstName} {log.user?.lastName}
            </div>
            <div className={styles.timeInfo}>
              <AccessTimeIcon fontSize="small" className={styles.timeIcon} />
              {formatTimeSpent(log.timeSpent)} — {formatDate(log.workDate)}
              <span className={styles.loggedOn}>
                &nbsp;| Logged on: {formatDate(log.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
