export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  INVITES = 'invites',
  TASKS = 'tasks',
  TASK_DETAILS = "task_details",
  SPRINTS = "sprints",
  TEAM = "team",
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.TASKS]: '/tasks',
  [AppRoutes.TASK_DETAILS]: "/tasks/:taskId",
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.INVITES]: '/invites',
  [AppRoutes.SPRINTS]: '/sprints',
  [AppRoutes.TEAM]: '/team',
  [AppRoutes.NOT_FOUND]: '*',
};