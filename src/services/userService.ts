import { UserInfoRS } from 'constants/domain';
import routePath from 'routes/routePath';
import { requests } from './api';

const userService = {
  login: (user: any): Promise<UserInfoRS> =>
    requests.post(routePath.user.login, user),
};

export default userService;
