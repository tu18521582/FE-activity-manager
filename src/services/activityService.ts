import { ActivitySummary } from 'constants/domain';
import { requests } from './api';
import userService from './userService';

const activityService = {
  allActivities: () => requests.get('/activities'),
  createActivity: (activity: any) => requests.post('/activities', activity),
  updateActivity: (activity: any) =>
    requests.put(`/activities/${activity.id}`, activity),
  followInfo: () => requests.get('/follow'),
  getFollowInfoByIdAct: async (idActivity: string) => {
    let listFollowInfo: any = [];

    await activityService.followInfo().then((result) => {
      listFollowInfo = result.followinfos;
    });

    let followInfoOfAct = listFollowInfo.filter(
      (ele: any) => ele.idActivityFollow === idActivity
    );

    return followInfoOfAct;
  },

  insertFollowInfo: (followInfo: any) => requests.post('/follow', followInfo),
  getActivitySummary: async () => {
    let activitySummary: ActivitySummary[] = [];
    let listFollowInfo: any = [];
    let listUserInfo: any = [];
    let userInfoMap = new Map();

    await activityService.allActivities().then((result) => {
      activitySummary = result.activities;
    });

    await activityService.followInfo().then((result) => {
      listFollowInfo = result.followinfos;
    });

    await userService.getAllUsers().then((result) => {
      listUserInfo = result.users;
    });

    listFollowInfo.forEach((followItem: any) => {
      listUserInfo.forEach((user: any) => {
        if (user.id === followItem.idUser) {
          const userArray = userInfoMap.get(followItem.idActivityFollow) || [];
          userArray.push(user);
          userInfoMap.set(followItem.idActivityFollow, userArray);
        }
      });
    });
    activitySummary.forEach((element: any) => {
      if (userInfoMap.get(element.id)) {
        element['userList'] = userInfoMap.get(element.id) || [];
      }
    });

    return activitySummary;
  },
  getDetailActivity: (id: string) => requests.get(`/activities/${id}`),
  cancelJoinActivity: (id: string) => requests.del(`/follow/${id}`),
};

export default activityService;
