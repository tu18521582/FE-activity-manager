import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer/indexReducer';

const middlewares = [thunkMiddleware];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
