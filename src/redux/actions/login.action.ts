import { SET_USER_INFO, SHOW_LOGIN_MODAL } from 'constants/constant';
import { UserInfo } from 'constants/domain';

export const showLoginModal = (boolean: Boolean) => ({
  type: SHOW_LOGIN_MODAL,
  payload: boolean,
});

export const setUserInfo = (userInfo: UserInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});
