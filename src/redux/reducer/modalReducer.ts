import { SHOW_LOGIN_MODAL, SHOW_REGISTER_MODAL } from 'constants/constant';
import { ActionType } from 'constants/domain';

const initialState = {
  isShowLoginModal: false,
  isShowRegisterModal: false,
};

export default function modal(state = initialState, action: ActionType) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { isShowLoginModal: action.payload };
    case SHOW_REGISTER_MODAL:
      return { isShowRegisterModal: action.payload };
    default:
      return state;
  }
}
