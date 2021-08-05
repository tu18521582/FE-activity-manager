import { lazy } from 'react';
import routePath from './routePath';

const Routes = [
  {
    path: routePath.home,
    component: lazy(
      () => import('components/features/landing-page/LandingContainer')
    ),
  },
];

export default Routes;
