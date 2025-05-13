import React, { useMemo, useState } from "react";
import ActiveProjectLayout from "../../app/layouts";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import {
  useGetTasksForProjectQuery,
  useCreateTaskMutation,
} from "../../api/taskApi";
import { useGetTeamForProjectQuery } from "../../api/project";
import TaskRow from "./TaskRow";
import NewTaskModal from "../../components/modals/NewTaskModal/NewTaskModal";
import {
  CircularProgress,
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import styles from "./Tasks.module.scss";
import {
  statuses as statusOptions,
  priorities,
  taskTypes,
} from "../../shared/const/task";
import { Task } from "../../shared/types/task";
import { ACTIVE_PROJECT_ID } from "../../shared/const/localStorage";

const TasksPage = () => {
  const projectId =
    useAppSelector((state) => state.activeProject.activeProject?.id) ||
    localStorage.getItem(ACTIVE_PROJECT_ID);

  const { data: tasks = [], isLoading } = useGetTasksForProjectQuery(projectId!, {
    skip: !projectId,
  });

  const { data: team = [] } = useGetTeamForProjectQuery(projectId!, {
    skip: !projectId,
  });

  const [createTask] = useCreateTaskMutation();

  const sprints: any[] = [];

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSprint, setSelectedSprint] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const assignees = useMemo(
    () =>
      team.map((m) => ({
        id: m.user.id,
        name: `${m.user.firstName} ${m.user.lastName}`,
      })),
    [team]
  );

  const sprintOptions: { id: string; name: string }[] = [];

  const handleCreateTask = async (values: any) => {
    try {
      const assigneeUser = team.find(
        (m) => `${m.user.firstName} ${m.user.lastName}` === values.assignee
      );
      const sprintObj = sprints?.find((s) => s.name === values.sprint);

      await createTask({
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        type: values.type,
        assignee: assigneeUser?.user.id,
        estimate: parseInt(values.estimate, 10) || 0,
        sprintId: sprintObj?.id || null,
        projectId,
      }).unwrap();

      setIsNewTaskOpen(false);
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = selectedStatus
        ? task.status === selectedStatus
        : true;
      const matchesSprint = selectedSprint
        ? task.sprint?.name === selectedSprint
        : true;
      const matchesAssignee = selectedAssignee
        ? `${task.assignee.firstName} ${task.assignee.lastName}` ===
          selectedAssignee
        : true;
      const matchesType = selectedType ? task.type === selectedType : true;
      const matchesPriority = selectedPriority
        ? task.priority === selectedPriority
        : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSprint &&
        matchesAssignee &&
        matchesType &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    selectedStatus,
    selectedSprint,
    selectedAssignee,
    selectedType,
    selectedPriority,
  ]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTasks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  return (
    <ActiveProjectLayout>
      <div className={styles.tasksPage}>
        <div className={styles.header}>
          <div className={styles.leftControls}>
            <TextField
              className={styles.searchInput}
              size="small"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className={styles.filters}>
              <FormControl size="small">
                <Select
                  value={selectedStatus}
                  displayEmpty
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {statusOptions.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small">
                <Select
                  value={selectedAssignee}
                  displayEmpty
                  onChange={(e) => {
                    setSelectedAssignee(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <MenuItem value="">All Assignees</MenuItem>
                  {assignees.map((a) => (
                    <MenuItem key={a.id} value={a.name}>
                      {a.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small">
                <Select
                  value={selectedType}
                  displayEmpty
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {taskTypes.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small">
                <Select
                  value={selectedPriority}
                  displayEmpty
                  onChange={(e) => {
                    setSelectedPriority(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <MenuItem value="">All Priorities</MenuItem>
                  {priorities.map((p) => (
                    <MenuItem key={p.value} value={p.value}>
                      {p.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <Button
            variant="contained"
            className={styles.newTaskBtn}
            onClick={() => setIsNewTaskOpen(true)}
          >
            + New Task
          </Button>
        </div>

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className={styles.taskList}>
              {paginatedTasks.map((task: Task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>

            <div className={styles.paginationContainer}>
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`${styles.pageBtn} ${
                      currentPage === index + 1 ? styles.active : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={styles.pageBtn}
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  →
                </button>
              </div>
            </div>
          </>
        )}

        <NewTaskModal
          open={isNewTaskOpen}
          onClose={() => setIsNewTaskOpen(false)}
          onCreate={handleCreateTask}
          team={assignees}
          sprints={sprintOptions}
        />
      </div>
    </ActiveProjectLayout>
  );
};

export default TasksPage;
