import React, { useMemo, useState, useEffect } from "react";
import styles from "./Sprints.module.scss";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ActiveProjectLayout from "../../app/layouts";
import { TaskCard } from "../../components/sprint/taskCard";
import { priorities, statuses, taskTypes } from "../../shared/const/task";
import { CreateSprintModal } from "../../components/modals/CreateSprintModal";
import { ConfirmEndModal } from "../../components/modals/ConfirmEndSprintModal";
import {
  useGetActiveSprintQuery,
  useCreateSprintMutation,
  useFinishSprintMutation,
} from "../../api/sprintsApi";
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { useGetTeamForProjectQuery } from "../../api/project";
import { useEditTaskMutation } from "../../api/taskApi";
import { Task } from "../../shared/types/task";

export const SprintBoardPage = () => {
  const projectId = useAppSelector(
    (state) => state.activeProject.activeProject?.id
  )!;

  const {
    data: sprint,
    isLoading,
    refetch,
  } = useGetActiveSprintQuery(projectId, {
    skip: !projectId,
  });

  const { data: team } = useGetTeamForProjectQuery(projectId);
  const [createSprint] = useCreateSprintMutation();
  const [finishSprint] = useFinishSprintMutation();
  const [editTask] = useEditTaskMutation();

  const [localTasks, setLocalTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Примусове оновлення тасок
    const loadFresh = async () => {
      await refetch(); // чекаємо свіжі дані
      setIsReady(true); // після них — рендеримо
    };
    loadFresh();
  }, [refetch]);

  useEffect(() => {
    if (sprint?.tasks) {
      setLocalTasks(sprint.tasks);
    }
  }, [sprint]);

  const [searchText, setSearchText] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");

  const [isCreateSprintModalOpen, setCreateSprintModalOpen] = useState(false);
  const [isConfirmEndModalOpen, setConfirmEndModalOpen] = useState(false);
  const [createAfterFinish, setCreateAfterFinish] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Забороняємо зміну порядку всередині однієї колонки
    if (destination.droppableId === source.droppableId) return;

    // Локально оновлюємо статус для плавного UI
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );

    try {
      await editTask({
        taskId: draggableId,
        body: { status: destination.droppableId },
      }).unwrap();
      // ❌ НЕ робимо refetch одразу — порядок може зламатися
      // Можна зробити відкладений refetch якщо дуже треба:
      // setTimeout(() => refetch(), 1000);
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const handleCreateSprint = async ({
    name,
    startDate,
    endDate,
    taskIds,
  }: {
    name: string;
    startDate: string;
    endDate: string;
    taskIds: string[];
  }) => {
    try {
      await createSprint({
        body: {
          name,
          startDate,
          endDate,
          taskIds,
        },
        projectId,
      }).unwrap();

      setCreateSprintModalOpen(false);
      refetch();
    } catch (err) {
      console.error("Failed to create sprint", err);
    }
  };

  const handleFinishSprint = async () => {
    if (!sprint?.id) return;
    try {
      await finishSprint({ sprintId: sprint.id }).unwrap();
      setConfirmEndModalOpen(false);
      setLocalTasks([]); // ❗️Очищаємо таски при завершенні спринта
      if (createAfterFinish) {
        setTimeout(() => setCreateSprintModalOpen(true), 0);
        setCreateAfterFinish(false);
      }
      refetch(); // оновлення бекових даних
    } catch (err) {
      console.error("Failed to finish sprint", err);
    }
  };

  const filteredTasks = useMemo(() => {
    return localTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (!assigneeFilter || task.assignee?.id === assigneeFilter) &&
        (!typeFilter || task.type === typeFilter) &&
        (!priorityFilter || task.priority === priorityFilter) &&
        (!labelFilter || task.labels?.includes(labelFilter))
    );
  }, [
    localTasks,
    searchText,
    assigneeFilter,
    typeFilter,
    priorityFilter,
    labelFilter,
  ]);

  return (
    <ActiveProjectLayout>
      <div className={styles.wrapper}>
        <div className={styles.sprintHeader}>
          <div className={styles.sprintInfo}>
            <h1>{sprint?.name || "No Active Sprint"}</h1>
            {sprint && (
              <div className={styles.sprintMeta}>
                <span>
                  • Start: {sprint.startDate} – End: {sprint.endDate}
                </span>
              </div>
            )}
          </div>

          <div className={styles.filtersWrapper}>
            <div className={styles.actionsRow}>
              <div />
              <div className={styles.actions}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    if (sprint) {
                      setCreateAfterFinish(true);
                      setConfirmEndModalOpen(true);
                    } else {
                      setCreateSprintModalOpen(true);
                    }
                  }}
                >
                  + Create Sprint
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={!sprint}
                  sx={{
                    color: "#555",
                    borderColor: "#ccc",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#f3f3f3" },
                  }}
                  onClick={() => {
                    setCreateAfterFinish(false);
                    setConfirmEndModalOpen(true);
                  }}
                >
                  Finish Sprint
                </Button>
              </div>
            </div>

            <div className={styles.filters}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
              />

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Assignee</InputLabel>
                <Select
                  value={assigneeFilter}
                  label="Assignee"
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {team?.map((member) => (
                    <MenuItem key={member.user.id} value={member.user.id}>
                      {member.user.firstName} {member.user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {taskTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priorityFilter}
                  label="Priority"
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {priorities.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {isReady && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.board}>
              {statuses.map((status) => (
                <Droppable droppableId={status.value} key={status.value}>
                  {(provided) => (
                    <div
                      className={styles.column}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className={styles.columnHeader}>{status.label}</div>
                      <div className={styles.tasksArea}>
                        {filteredTasks
                          .filter((task) => task.status === status.value)
                          .map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className={styles.taskCardWrapper}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TaskCard task={task} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>

      <CreateSprintModal
        open={isCreateSprintModalOpen}
        onClose={() => setCreateSprintModalOpen(false)}
        onCreate={handleCreateSprint}
      />

      <ConfirmEndModal
        open={isConfirmEndModalOpen}
        onCancel={() => setConfirmEndModalOpen(false)}
        onConfirm={handleFinishSprint}
      />
    </ActiveProjectLayout>
  );
};
