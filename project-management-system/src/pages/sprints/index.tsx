import { Button } from "@mui/material";
import { Plus } from "lucide-react"; // для гарної іконки плюса
import styles from "./SprintBoardPage.module.scss";

export const SprintBoardPage = () => {
  return (
    <div className={styles.boardPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Q2 2025 - Sprint 11</h1>
        <div className={styles.actions}>
          <input type="text" placeholder="Search tasks..." className={styles.searchInput} />
          {/* Фільтри можна поки залишити заглушками */}
          <div className={styles.filters}>
            <Button size="small" variant="outlined">Epic</Button>
            <Button size="small" variant="outlined">Label</Button>
            <Button size="small" variant="outlined">More</Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={18} />}
            className={styles.createSprintButton}
          >
            Create Sprint
          </Button>
        </div>
      </div>

      <div className={styles.columns}>
        {/* Тут потім будуть колонки Assigned / To Do / In Progress і т.д. */}
        <div className={styles.column}>
          <h2>Assigned</h2>
          {/* Tasks here */}
        </div>
        <div className={styles.column}>
          <h2>To Do</h2>
          {/* Tasks here */}
        </div>
        <div className={styles.column}>
          <h2>Problem</h2>
          {/* Tasks here */}
        </div>
        {/* Інші колонки */}
      </div>
    </div>
  );
};
