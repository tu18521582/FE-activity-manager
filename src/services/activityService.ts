import { requests } from './api';

const activityService = {
  allActivities: () => requests.get('/activity/all'),
  createActivity: (activity: any) =>
    requests.post('/activity/new-activity', activity),
};

export default activityService;
