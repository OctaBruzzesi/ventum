import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
});