import { requests } from './api';

const activityService = {
  getAllActivities: () => requests.get('/activities'),
  createActivity: (activity: any) =>
    requests.post(`/activity?userid=${activity.idcreator}`, activity),
  updateActivity: (activity: any) =>
    requests.put(`/activity/${activity.id}`, activity),
  followInfo: () => requests.get('/follow'),
  attendActivity: (idActivityFollow: string) =>
    requests.post(`/follow/activity/${idActivityFollow}`),
  unAttendActivity: (idActivityFollow: string) =>
    requests.post(`/unfollow/activity/${idActivityFollow}`),
  getDetailActivity: (id: string) => requests.get(`/activity/${id}`),
};

export default activityService;
