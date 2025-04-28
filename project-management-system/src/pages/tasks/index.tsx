import React, { useState } from "react";
import ActiveProjectLayout from "../../app/layouts";
import { Task } from "../../shared/types/task";
import TaskRow from "./TaskRow";
import styles from "./Tasks.module.scss";
import NewTaskModal from "../../components/modals/NewTaskModal/NewTaskModal";
import { mockTasks } from "../../shared/const/mockTasks";


const TasksPage = () => {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const handleOpenNewTask = () => {
    setIsNewTaskOpen(true);
  };

  const handleCloseNewTask = () => {
    setIsNewTaskOpen(false);
  };
  return (
    <ActiveProjectLayout>
      <div className={styles.tasksPage}>
        <div className={styles.header}>
          <input type="text" placeholder="Search tasks..." />
          <div className={styles.filters}>
            <select>
              <option>All Sprints</option>
              <option>Sprint 1</option>
              <option>Sprint 2</option>
            </select>
            <select>
              <option>Status</option>
              <option>To Do</option>
              <option>QA Ready</option>
              <option>Code Review</option>
            </select>
            <select>
              <option>Assignee</option>
              <option>AR</option>
              <option>DC</option>
            </select>
          </div>
          <button onClick={handleOpenNewTask} className={styles.newTaskBtn}>
            + New Task
          </button>
        </div>

        <div className={styles.taskList}>
          {mockTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
        <NewTaskModal open={isNewTaskOpen} onClose={handleCloseNewTask} onCreate={() => console.log('Created!')} />
      </div>
    </ActiveProjectLayout>
  );
};

export default TasksPage;
