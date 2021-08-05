import { combineReducers } from 'redux';
import login from './loginReducer';
import modal from './modalReducer';

export default combineReducers({
  login,
  modal,
});
