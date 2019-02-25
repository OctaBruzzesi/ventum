import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT
} from '../types';

const initialState = {
  loading: false,
  authData: {},
  error: ''
};

const getAuth = (state) => state.auth;

export { getAuth };

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        loading: true,
        authData: {},
        error: ''
      };
    case AUTH_SUCCESS:
      return {
        loading: false,
        authData: {
          token: action.payload
        },
        error: ''
      };
    case AUTH_ERROR:
      return {
        loading: false,
        authData: {},
        error: action.payload
      };
    case AUTH_LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }
};
