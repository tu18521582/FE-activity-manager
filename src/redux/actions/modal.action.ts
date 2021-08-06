import { SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from 'constants/constant';

export const showLoginModal = (isShowModal: Boolean) => ({
  type: SHOW_LOGIN_MODAL,
  payload: isShowModal,
});

export const showRegisterModal = (isShowModal: Boolean) => ({
  type: SHOW_REGISTER_MODAL,
  payload: isShowModal,
});
