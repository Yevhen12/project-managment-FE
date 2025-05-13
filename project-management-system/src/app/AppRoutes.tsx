import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeConfig } from "./config/routesConfig";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";
import { setActiveProject } from "../store/slices/activeProjectSlice";
import { ACTIVE_PROJECT_ID } from "../shared/const/localStorage";
import { useLazyGetFullProfileQuery } from "../api/authApi";
import { setUser, clearUser } from "../store/slices/authSlice";
import LoadingSpinner from "../components/loadingSpinner";
import { useLazyGetProjectQuery } from "../api/project";
import { useAppSelector } from "../shared/hooks/useAppSelector";

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const [getProfile] = useLazyGetFullProfileQuery();
  const [getProject] = useLazyGetProjectQuery();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const state = useAppSelector((state) => state);
  console.log({ state });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      getProfile()
        .unwrap()
        .then(async (res) => {
          dispatch(setUser(res.data));

          const storedProjectId = localStorage.getItem(ACTIVE_PROJECT_ID);
          if (storedProjectId) {
            try {
              const project = await getProject(storedProjectId).unwrap();
              dispatch(setActiveProject(project));
            } catch (e) {
              console.warn("❌ Failed to fetch active project", e);
              localStorage.removeItem(ACTIVE_PROJECT_ID);
            }
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          dispatch(clearUser());
        })
        .finally(() => setIsCheckingAuth(false));
    } else {
      setIsCheckingAuth(false);
    }
  }, [dispatch, getProfile, getProject]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
