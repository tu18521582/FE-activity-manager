import { requests } from './api';

const activityService = {
  allActivities: () => requests.get('/activities'),
  createActivity: (activity: any) => requests.post('/activities', activity),
  followInfo: () => requests.get('/follow'),
  participantInfo: () => requests.get('/participant'),
};

export default activityService;
