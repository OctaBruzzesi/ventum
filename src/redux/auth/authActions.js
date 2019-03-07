import {
  AUTH_START, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT,
} from '../types';
import { firebaseAuth } from '../../firebase/firebase';
import { loadAuth } from '../../utils/storage';

const authStart = () => ({
  type: AUTH_START,
});

const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

const authLogout = () => ({
  type: AUTH_LOGOUT,
});

const authSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload,
});

export const getAuthFromStorage = () => (dispatch) => {
  const authData = loadAuth();

  if (authData) {
    dispatch(authSuccess(authData));
  }
};

export const signOut = () => (dispatch) => {
  // firebaseAuth.doSignOut();
  dispatch(authLogout());
  // return dispatch => {
  //   localStorage.removeItem('auth');
  // }
};

export const login = (email, pass) => (dispatch) => {
  dispatch(authStart());

  firebaseAuth.signInWithEmailAndPassword(email, pass)
    .then((data) => {
      localStorage.setItem('auth', 'auth');
      dispatch(authSuccess('auth'));
    })
    .catch((e) => {
      const codeError = e.code;
      let errorDetail = '';

      switch (codeError) {
        case 'auth/invalid-email':
          errorDetail = 'El usuario y/ó contraseña ingresados son incorrectos';
          break;

        default:
          errorDetail = 'Error genérico';
          break;
      }

      dispatch(authError(errorDetail));
    });
};
