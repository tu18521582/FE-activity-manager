interface ActionType {
  type: string;
  error?: any;
  meta?: any;
  payload?: any;
}

const initialState = {
  counter: 0,
};

const appReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};

export default appReducer;
