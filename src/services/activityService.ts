import { FollowInfo } from 'constants/domain';
import { requests } from './api';

const activityService = {
  getAllActivities: () => requests.get('/activities'),
  createActivity: (activity: any) =>
    requests.post(`/activity?userid=${activity.idcreator}`, activity),
  updateActivity: (activity: any) =>
    requests.put(`/activity/${activity.id}`, activity),
  followInfo: () => requests.get('/follow'),
  getFollowInfoByAttr: (folloInfoAttr: any) =>
    requests.get(
      `/follow/user/${folloInfoAttr.idUser}/activity/${folloInfoAttr.idActivityFollow}`
    ),
  attendActivity: (followInfo: FollowInfo) =>
    requests.post(
      `/follow/user/${followInfo.idUser}/activity/${followInfo.idActivityFollow}`,
      followInfo
    ),
  unAttendActivity: (followInfo: FollowInfo) =>
    requests.post(
      `/unfollow/user/${followInfo.idUser}/activity/${followInfo.idActivityFollow}`,
      followInfo
    ),
  getDetailActivity: (id: string) => requests.get(`/activity/${id}`),
};

export default activityService;
