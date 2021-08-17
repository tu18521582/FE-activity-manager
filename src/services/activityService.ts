import { requests } from './api';

const activityService = {
  allActivities: () => requests.get('/activities'),
  createActivity: (activity: any) => requests.post('/activities', activity),
  followInfo: () => requests.get('/follow'),
  participantInfo: () => requests.get('/participant'),
  getActivitySummary: () => {
    //get all activity => list activity summary
    //create list activity id from all activity [1,2,3,4...]
    //get all followInfo [{},{}]
    //get all userInfo
    //userInfoMap(key: activityId, value: userInfo[])
    //loop followInfo {follow => {loop userinfo => {user=> {
    //  if(user.id == follow.user_id){
    //    const userArray = userInfoMap.get(follow.id_post_follow) || [];
    //    userArray.push(user);
    //    userInfoMap.set(follow.id_post_follow, userArray)
    //}
    //loop activitySummaryList (list activity summary) (ele=>{
    //   ele.userList = userInfoMap.get(ele.id);
    // })
    //}}}}
    //list userInfo ? host
  },
};

export default activityService;
