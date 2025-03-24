import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routeConfig } from './config/routesConfig';
import { useAppDispatch } from '../shared/hooks/useAppDispatch';
import { setActiveProject } from '../store/slices/activeProjectSlice';
import { ACTIVE_PROJECT_ID } from '../shared/const/localStorage';
import { useGetProjectsQuery } from '../api/project';

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  useGetProjectsQuery();
  
  useEffect(() => {
    const storedProjectId = localStorage.getItem(ACTIVE_PROJECT_ID);
    console.log('TEST',storedProjectId )
    if (storedProjectId) {
      dispatch(setActiveProject(storedProjectId));
    }

    localStorage.setItem('test', 'test')
  }, [dispatch]);

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
