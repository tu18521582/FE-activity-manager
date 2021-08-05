import routePath from 'routes/routePath';
import { requests } from './api';

const userService = {
  login: (user: any) => requests.post(routePath.user.login, user),
  signup: (user: any) => requests.post(routePath.user.signup, user),
};

export default userService;
