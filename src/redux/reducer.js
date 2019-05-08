import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth/authReducer';
import waterReducer from './water/waterReducer';
import userReducer from './users/usersReducer';
import favouritesReducer from './favourites/favouritesReducer';

export default combineReducers({
  auth: authReducer,
  water: waterReducer,
  form: formReducer,
  user: userReducer,
  favourites: favouritesReducer,
});
