import { ActivitySummary } from 'constants/domain';
import { requests } from './api';
import userService from './userService';

const activityService = {
  allActivities: () => requests.get('/activities'),
  createActivity: (activity: any) => requests.post('/activities', activity),
  followInfo: () => requests.get('/follow'),
  getActivitySummary: async () => {
    let activitySummary: ActivitySummary[] = [];
    let listFollowInfo: any = [];
    let listUserInfo: any = [];
    let userInfoMap = new Map();

    try {
      await activityService.allActivities().then((result) => {
        activitySummary = result.activities;
      });
    } catch (error) {
      alert(error);
    }
    try {
      await activityService.followInfo().then((result) => {
        listFollowInfo = result.followinfos;
      });
    } catch (error) {
      alert(error);
    }

    try {
      await userService.getAllUsers().then((result) => {
        listUserInfo = result.users;
      });
    } catch (error) {
      alert(error);
    }
    listFollowInfo.forEach((followItem: any) => {
      listUserInfo.forEach((user: any) => {
        if (user.id === followItem.id_user) {
          const userArray = userInfoMap.get(followItem.id_post_follow) || [];
          userArray.push(user);
          userInfoMap.set(followItem.id_post_follow, userArray);
        }
      });
    });
    activitySummary.forEach((element: any) => {
      if (userInfoMap.get(element.id)) {
        element['userList'] = userInfoMap.get(element.id);
      }
    });

    return activitySummary;
  },
};

export default activityService;
