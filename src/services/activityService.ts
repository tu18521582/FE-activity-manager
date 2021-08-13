import { requests } from './api';

const activityService = {
  allActivities: () => requests.get('/activities'),
  createActivity: (activity: any) => requests.post('/activities', activity),
};

export default activityService;
