import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth/authReducer';
import waterReducer from './water/waterReducer';
import environmentReducer from './environment/environmentReducer';
import userReducer from './users/usersReducer';
import favouritesReducer from './favourites/favouritesReducer';
import permitsReducer from './configuration/permitsReducer';

export default combineReducers({
  auth: authReducer,
  water: waterReducer,
  environment: environmentReducer,
  form: formReducer,
  user: userReducer,
  permits: permitsReducer,
  favourites: favouritesReducer,
});
