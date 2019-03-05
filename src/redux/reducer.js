import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import waterReducer from './water/waterReducer';

export default combineReducers({
  auth: authReducer,
  water: waterReducer,
});
