import { AppRoutes, RoutePath } from "../../shared/const/router";
import { RouteAppProps } from "../../shared/types/router";
import LoginPage from "../..//pages/login";
import NotFoundPage from "../..//pages/notFound";
import RegisterPage from "../../pages/register";
import DashboardPage from "../../pages/dashboard";
import SelectProjectPage from "../../pages/selectProject";
import InvitesPage from "../../pages/invites";
import TasksPage from "../../pages/tasks";
import TaskDetailsPage from "../../pages/taskDetails";
import { SprintBoardPage } from "../../pages/sprints";
import { TeamsPage } from "../../pages/team";
import { ProfilePage } from "../../pages/profile";
import { ArchivePage } from "../../pages/arhive";
import AnalyticsPage from "../../pages/analytics";
import SubscriptionPage from "../../pages/subscription";
import SubscriptionSuccessPage from "../../pages/successPayment";
import SubscriptionCancelPage from "../../pages/errorPayment";

export const routeConfig: Record<AppRoutes, RouteAppProps> = {
  [AppRoutes.SELECT_PROJECT]: {
    path: RoutePath.select_project,
    element: <SelectProjectPage />,
    authOnly: true,
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
    path: RoutePath.dashboard,
    element: <DashboardPage />,
    authOnly: true,
  },
  [AppRoutes.TASKS]: {
    path: RoutePath.tasks,
    element: <TasksPage />,
    authOnly: true,
  },
  [AppRoutes.TASK_DETAILS]: {
    path: RoutePath.task_details,
    element: <TaskDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.SPRINTS]: {
    path: RoutePath.sprints,
    element: <SprintBoardPage />,
    authOnly: true,
  },
  [AppRoutes.TEAM]: {
    path: RoutePath.team,
    element: <TeamsPage />,
    authOnly: true,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.INVITES]: {
    path: RoutePath.invites,
    element: <InvitesPage />,
    authOnly: true,
  },
  [AppRoutes.ARCHIVE]: {
    path: RoutePath.archive,
    element: <ArchivePage />,
    authOnly: true,
  },
  [AppRoutes.ANALYTICS]: {
    path: RoutePath.analytics,
    element: <AnalyticsPage />,
    authOnly: true,
  },
  [AppRoutes.SUBSCRIPTION]: {
    path: RoutePath.subscription,
    element: <SubscriptionPage />,
    authOnly: true,
  },
  [AppRoutes.SUBSCRIPTION_SUCCESS]: {
    path: RoutePath.subscription_success,
    element: <SubscriptionSuccessPage />,
    authOnly: true,
  },
  [AppRoutes.SUBSCRIPTION_FAILED]: {
    path: RoutePath.subscription_cancel,
    element: <SubscriptionCancelPage />,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
    authOnly: false,
  },
};
