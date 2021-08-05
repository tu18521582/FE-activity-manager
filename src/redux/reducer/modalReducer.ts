import { SHOW_LOGIN_MODAL } from 'constants/constant';
import { ActionType } from 'constants/domain';

const initialState = {
  isShowLoginModal: false,
};

export default function modal(state = initialState, action: ActionType) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { isShowLoginModal: action.payload };
    default:
      return state;
  }
}
