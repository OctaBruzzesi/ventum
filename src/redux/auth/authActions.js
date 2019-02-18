import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from '../types';
import { firebaseAuth } from '../../firebase/firebase';
import { loadAuth } from '../../utils/storage';

export const login = (email, pass) => (dispatch) => {
  console.log(email, pass, firebaseAuth.signInWithEmailAndPassword(email, pass))
  firebaseAuth.signInWithEmailAndPassword(email, pass)
  .then(data => {
    console.log('logueado', data);
  })
  .catch(e =>
    console.log(e)
  )
  // localStorage.setItem('auth', 'auth');
  // dispatch(authSuccess('auth'));
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