import { requests } from './api';

const userService = {
  login: (user: any) => requests.post('/user/login', user),
  getUserInformation: () => requests.get('/user'),
  signup: (user: any) => {
    return requests.post('/user', user);
  },
  getAllUsers: () => requests.get('/users'),
};

export default userService;
