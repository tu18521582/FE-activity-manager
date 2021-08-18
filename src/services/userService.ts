import { requests } from './api';

const userService = {
  login: (user: any) => requests.post('/user/login', user),
  signup: (user: any) => requests.post('/user/signup', user),
  getAllUsers: () => requests.get('/users'),
};

export default userService;
