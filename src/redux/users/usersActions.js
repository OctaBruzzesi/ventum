import { database } from '../../firebase/firebase';
import { USER_REGISTER_SUCCESS, USERS_FETCH, SET_CURRENT_USER, USER_ERROR } from '../types';

const userSuccess = () => ({
  type: USER_REGISTER_SUCCESS,
});

const fetchUsers = list => ({
  type: USERS_FETCH,
  payload: list,
});

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const getDisplayStyleByPermits = () => {
  /* Devuelve el objeto Style
   * Esta pensado para cuando el elemento a ocultar NO tiene un style
   */

  const user = localStorage.getItem('user');
  const userJSON = JSON.parse(user);
  const worker = userJSON.worker;
  const admin = userJSON.admin;

  const display = worker || admin ? '' : 'none';
  return {
    'display': `${display}`,
  };  
}

export const getDisplayCssPropByPermits = () => {
  /* Devuelve sólo el atributo CSS
   * Esta pensado para cuando el elemento a ocultar ya tiene un style
   */

  const user = localStorage.getItem('user');
  const userJSON = JSON.parse(user);
  const worker = userJSON.worker;
  const admin = userJSON.admin;

  const display = worker || admin ? '' : 'none';
  return display;  
}

const userError = () => ({
  type: USER_ERROR,
});

export const addUser = (userName, newUser) => async (dispatch) => {
  database.collection('users/').doc(userName).set(newUser)
    .then(() => {
      dispatch(userSuccess());
    })
    .catch((error) => {
      dispatch(error);
    });
};

export const getUsersID = () => async (dispatch) => {
  database.collection('users').get()
    .then((data) => {
      const list = [];
      data.forEach(doc => list.push(doc.id));
      dispatch(fetchUsers(list));
    });
};

export const setUserFromStorage = () => async (dispatch) => {
  const user = localStorage.getItem('user');
  dispatch(setCurrentUser(JSON.parse(user)));
};

export const fetchUser = email => async (dispatch) => {
  database.collection('users').get()
    .then((data) => {
      let user = {};
      data.forEach((document) => {
        if (document.data().email === email) {
          user = document.data();
        }
      });
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setCurrentUser(user));
    })
    .catch(e => console.log(e));
};
