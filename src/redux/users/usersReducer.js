import {
  USERS_FETCH,
  USER_ERROR,
  SET_CURRENT_USER,
  USER_REGISTER_SUCCESS,
} from '../types';

const initialState = {
  data: [],
  user: {},
  registerSuccess: false,
  error: '',
};

const getUser = state => state.user;

export { getUser };

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ERROR:
      return {
        error: action.payload,
        registerSuccess: false,
      };
    default:
      return state;
  }
};
