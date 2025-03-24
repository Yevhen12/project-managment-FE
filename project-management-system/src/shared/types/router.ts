import { ReactNode } from 'react';

export interface RouteAppProps {
  path: string;
  element: ReactNode;
  authOnly?: boolean;
}