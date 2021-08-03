import routePath from 'routes/routePath';
import { requests } from './api';

const userService = {
  login: (user: any) => requests.post(routePath.user.login, user),
  signup: (user: any) => requests.post(routePath.user.signup, user),
  allUser: () => requests.get(routePath.user.all),
};

export default userService;
