import { lazy } from 'react';
import routePath from './routePath';

const Routes = [
  {
    path: routePath.home,
    component: lazy(() => import('components/features/home/Home')),
  },
  {
    path: routePath.welcomeReact,
    component: lazy(() => import('components/features/welcome-react/WelcomeReact')),
  },
];

export default Routes;
