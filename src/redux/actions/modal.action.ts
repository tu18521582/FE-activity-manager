import { SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from 'constants/constant';

export const showLoginModal = (boolean: Boolean) => ({
  type: SHOW_LOGIN_MODAL,
  payload: boolean,
});

export const showRegisterModal = (boolean: Boolean) => ({
  type: SHOW_REGISTER_MODAL,
  payload: boolean,
});
