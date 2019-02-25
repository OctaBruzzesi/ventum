import { AUTH_START, AUTH_SUCCESS, AUTH_ERROR } from '../types';
import { firebaseAuth } from '../../firebase/firebase';
import { loadAuth } from '../../utils/storage';

export const login = (email, pass) => (dispatch) => {
  dispatch(authStart());

  firebaseAuth.signInWithEmailAndPassword(email, pass)
  .then(data => {
    localStorage.setItem('auth', 'auth');
    dispatch(authSuccess('auth'));
  })
  .catch(e => {
    dispatch(authError('Error'))
    console.log(e);
  })
}

export const getAuthFromStorage = () => (dispatch) => {
  const authData = loadAuth();

  if (authData) {
    dispatch(authSuccess(authData));
  }
}

const authStart = () => {
  return {
    type: AUTH_START
  }
};

const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
};

const authSuccess = (payload) => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
};