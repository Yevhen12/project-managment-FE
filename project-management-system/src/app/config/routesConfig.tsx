import { AppRoutes, RoutePath } from '../../shared/const/router';
import { RouteAppProps } from '../../shared/types/router';
import LoginPage from '../..//pages/login';
import NotFoundPage from '../..//pages/notFound';
import RegisterPage from '../../pages/register';
import DashboardPage from '../../pages/dashboard';
import SelectProjectPage from '../../pages/selectProject';

export const routeConfig: Record<AppRoutes, RouteAppProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <SelectProjectPage />,
    authOnly: true, // або false, якщо не потрібна авторизація
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
    authOnly: false,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: <RegisterPage />,
    authOnly: false,
  },
  [AppRoutes.DASHBOARD]: {
    path: `${RoutePath.dashboard}/:projectId`,
    element: <DashboardPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
    authOnly: false,
  }
};
