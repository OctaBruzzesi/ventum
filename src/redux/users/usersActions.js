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
      console.log(list);
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
