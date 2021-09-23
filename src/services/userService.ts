import { requests } from './api';

const userService = {
  login: (user: any) => requests.post('/user/login', user),
  signup: (user: any) => {
    return requests.post('/user', user);
  },
  getAllUsers: () => requests.get('/users'),
  getActivitiesHost: (userid: any) => requests.get(`activityhost/${userid}`),
  getActivitiesAttend: (userid: any) =>
    requests.get(`activityattend/${userid}`),
};

export default userService;
