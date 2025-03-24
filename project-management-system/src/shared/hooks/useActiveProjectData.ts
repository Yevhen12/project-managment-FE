import { selectActiveProjectData } from "../selectors";
import { useAppSelector } from "./useAppSelector";

export const useActiveProjectData = () => {
  const project = useAppSelector(selectActiveProjectData);

  if (!project) {
    return null
  }

  return project;
};