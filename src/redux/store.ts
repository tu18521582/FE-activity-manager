import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import appReducer from './AppReducer';

const middlewares = [thunkMiddleware];
const store = createStore(appReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;
