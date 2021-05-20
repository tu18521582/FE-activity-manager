import routePath from 'routes/routePath';
import { requests } from './api';

const userService = {
  login: (user: any) => requests.post(routePath.user.login, user),
};

export default userService;
