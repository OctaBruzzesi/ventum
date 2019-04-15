import { database } from '../../firebase/firebase';
import { PERMITS_SUCCESS, PERMITS_FETCH, PERMITS_ERROR } from '../types.js';

export const permitsSuccess = () => ({
  type: PERMITS_SUCCESS,
});

export const permitsError = () => ({
  type: PERMITS_ERROR,
});

export const permitsFetch = () => ({
  type: PERMITS_FETCH,
});

export const setPermits = (userName, newPermits) => async (dispatch) => {
  const { worker, admin } = newPermits;

  database.collection('users/').doc(userName)
    .update({ worker, admin })
    .then(() => {
      dispatch(permitsSuccess());
    })
    .catch((error) => {
      dispatch(error);
    });
};
