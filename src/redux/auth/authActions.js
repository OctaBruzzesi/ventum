import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from '../types';
import { firebaseAuth } from '../../firebase/firebase';
import { loadAuth } from '../../utils/storage';

export const login = (email, pass) => (dispatch) => {
  firebaseAuth.signInWithEmailAndPassword(email, pass)
  .then(data => {
    localStorage.setItem('auth', 'auth');
    dispatch(authSuccess('auth'));
  })
  .catch(e =>
    console.log(e)
  )
}

export const getAuthFromStorage = () => (dispatch) => {
  const authData = loadAuth();

  if (authData) {
    dispatch(authSuccess(authData));
  }
}

const authSuccess = (payload) => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
};