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
      () => import('components/features/activity-list/ActivityListContainer')
    ),
  },
  {
    path: routePath.activity.createActivity,
    component: lazy(
      () => import('components/features/create-activity/CreateActivity')
    ),
  },
  {
    path: routePath.activity.detailActivity,
    component: lazy(
      () =>
        import('components/features/activity-detail/ActivityDetailContainer')
    ),
  },
];

export default Routes;
