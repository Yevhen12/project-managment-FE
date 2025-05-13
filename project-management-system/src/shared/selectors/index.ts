import { RootState } from "../../store/store";
import { ACTIVE_PROJECT_ID } from "../const/localStorage";

export const selectActiveProjectId = (state: RootState) =>
  state.activeProject.activeProject?.id ||
  localStorage.getItem(ACTIVE_PROJECT_ID);
