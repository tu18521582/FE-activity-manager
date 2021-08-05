import { SET_USER_INFO } from 'constants/constant';
import { UserInfo } from 'constants/domain';

export const setUserInfo = (userInfo: UserInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});
