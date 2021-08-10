import { requests } from './api';

const activityService = {
  allActivities: () => requests.get('/activity/all'),
};

export default activityService;
