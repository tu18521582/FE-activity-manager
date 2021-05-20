import routePath from 'routes/routePath';
import { requests } from './api';

const activityService = {
  allActivities: () => requests.get(routePath.activity.all),
};

export default activityService;
