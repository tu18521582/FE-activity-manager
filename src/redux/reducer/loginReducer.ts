import { SET_USER_INFO } from 'constants/constant';
import { ActionType } from 'constants/domain';

const initialState = {
  username: '',
  displayname: '',
  email: '',
  id: '',
  password: '',
};

export default function login(state = initialState, action: ActionType) {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
