interface ActionType {
  type: string;
  error?: any;
  meta?: any;
  payload?: any;
}

const initialState = {
  counter: 0,
  isShowLoginModal: false,
  userLoginInfo: {
    username: '',
    displayname: '',
    email: '',
    id: '',
  },
};

const appReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + action.payload };
    case 'SHOW_LOGIN_MODAL':
      return { ...state, isShowLoginModal: action.payload };
    case 'SET_USER_INFO':
      return { ...state, userLoginInfo: action.payload };
    default:
      return state;
  }
};

export default appReducer;
