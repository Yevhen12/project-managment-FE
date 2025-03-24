export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  INVITES = 'invites',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.INVITES]: '/invites',
  [AppRoutes.NOT_FOUND]: '*',
};