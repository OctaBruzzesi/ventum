import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from '../types';

const initialState = {
  started: false,
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
        started: true,
        loading: true,
        authData: {},
        error: ''
      };
    case AUTH_SUCCESS:
      return {
        started: true,
        loading: false,
        authData: {
          token: action.payload
        },
        error: ''
      };
    case AUTH_FAIL:
      return {
        started: true,
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
