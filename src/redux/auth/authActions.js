import moment from 'moment';
import {
  AUTH_START, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT, REGISTER_SUCCESS,
} from '../types';
import { firebaseAuth, database } from '../../firebase/firebase';
import { loadAuth } from '../../utils/storage';
import { addUser } from '../users/usersActions';

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
  dispatch(authLogout());
};

export const signUp = newUser => (dispatch) => {
  const {
    userName, email, password, name, lastName,
  } = newUser;

  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(addUser(userName.replace(' ', '_'), {
        admin: false,
        worker: false,
        email,
        name,
        lastName,
        timeRegister: moment().format('YYYY-MM-DDTHH:mm'),
      }));
    })
    .catch((e) => {
      const codeError = e.code;
      let errorDetail = '';

      switch (codeError) {
        case 'auth/email-already-in-use':
          errorDetail = 'El email ingresado ya se encuentra registrado.';
          break;

        case 'auth/invalid-email':
          errorDetail = 'El email ingresado no es válido.';
          break;

        case 'auth/operation-not-allowed':
          errorDetail = 'El email y/ó la contraseña no están habilitados para ser usados.';
          break;

        case 'auth/weak-password':
          errorDetail = 'La contraseña ingresada es demasiado corta.';
          break;

        default:
          errorDetail = 'Ha ocurrido un error. Contacte con los administradores.';
          break;
      }

      dispatch(authError(errorDetail));
    });
};

export const login = (email, pass) => (dispatch) => {
  dispatch(authStart());

  firebaseAuth.signInWithEmailAndPassword(email, pass)
    .then(() => {
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
