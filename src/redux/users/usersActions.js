import { user, database, auth } from '../../firebase/firebase';
import { USER_FETCH, USER_REGISTER_SUCCESS, USER_ERROR } from '../types';

export const completeToDo = completeToDoId => async () => {
  user.child(completeToDoId).remove();
};

export const userSuccess = () => ({
  type: USER_REGISTER_SUCCESS,
});

export const userError = () => ({
  type: USER_ERROR,
});

export const addUser = newUser => async (dispatch) => {
  database.collection('users').doc().set(newUser)
    .then(() => {
      dispatch(userSuccess());
    })
    .catch((error) => {
      dispatch(error);
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
