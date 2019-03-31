import {
  USER_FETCH,
  USER_ERROR,
  USER_REGISTER_SUCCESS,
} from '../types';

const initialState = {
  data: [],
  error: '',
};

const getUser = state => state.user;

export { getUser };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FETCH:
      return {
        data: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
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
