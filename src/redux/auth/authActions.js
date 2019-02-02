import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from '../types';
import { loadAuth } from '../../utils/storage';

export const login = (email, pass) => (dispatch) => {
  localStorage.setItem('auth', 'auth');
  dispatch(authSuccess('auth'));
}

export const getAuthFromStorage = () => (dispatch) => {
  const authData = loadAuth();

  if (authData) {
    dispatch(authSuccess(authData));
  }
}

const authSuccess = (payload) => {
  console.log('e', payload);
  return {
    type: AUTH_SUCCESS,
    payload
  }
};