import { SHOW_LOGIN_MODAL } from 'constants/constant';

export const showLoginModal = (boolean: Boolean) => ({
  type: SHOW_LOGIN_MODAL,
  payload: boolean,
});
