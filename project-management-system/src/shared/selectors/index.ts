import { projectApi } from "../../api/project";
import { RootState } from "../../store/store";
import { ACTIVE_PROJECT_ID } from "../const/localStorage";
import { Project } from "../types/project";

export const selectActiveProjectId = (state: RootState) =>
  state.activeProject.activeProjectId || localStorage.getItem(ACTIVE_PROJECT_ID);

export const selectActiveProjectData = (
  state: RootState
): Project | undefined => {
  const projectId =
    state.activeProject.activeProjectId ||
    localStorage.getItem(ACTIVE_PROJECT_ID);

  if (!projectId) return undefined;
  const allProjects = projectApi.endpoints.getProjects.select()(state)?.data;

  console.log({allProjects})

  return allProjects?.find((p) => p.id === projectId);
};
