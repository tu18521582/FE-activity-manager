import { lazy } from 'react';
import routePath from './routePath';

const Routes = [
  {
    path: routePath.home,
    component: lazy(
      () => import('components/features/landing-page/LandingContainer')
    ),
  },
  {
    path: routePath.activity.dashboard,
    component: lazy(
      () => import('components/features/dashboard/DashboardContainer')
    ),
  },
];

export default Routes;
