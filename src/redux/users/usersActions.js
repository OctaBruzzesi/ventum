import { user, database } from '../../firebase/firebase';
import { USER_REGISTER_SUCCESS, USER_FETCH, USER_ERROR } from '../types';

export const completeToDo = completeToDoId => async () => {
  user.child(completeToDoId).remove();
};

export const userSuccess = () => ({
  type: USER_REGISTER_SUCCESS,
});

export const userFetch = list => ({
  type: USER_FETCH,
  payload: list,
});

export const userError = error => ({
  type: USER_ERROR,
  error,
});

export const addUser = (userName, newUser) => async (dispatch) => {
  database.collection('users/').doc(userName).set(newUser)
    .then(() => {
      dispatch(userSuccess());
    })
    .catch((error) => {
      dispatch(userError(error));
    });
};

export const getUsersID = () => async (dispatch) => {
  database.collection('users').get()
    .then((data) => {
      const list = [];
      data.forEach(doc => list.push(doc.id));
      dispatch(userFetch(list));
    });
};

export const fetchUser = () => async (dispatch) => {
  database.collection('users').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push(document.data()));
      dispatch(userSuccess(collectionList));
    });
};
