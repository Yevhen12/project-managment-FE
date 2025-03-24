import { ACTIVE_PROJECT_ID } from "../const/localStorage";
import { selectActiveProjectId } from "../selectors";
import { useAppSelector } from "./useAppSelector";

export const useActiveProjectId = () => {
  const projectId = useAppSelector(selectActiveProjectId);

  if (!projectId) {
    return null
  }

  return projectId;
};