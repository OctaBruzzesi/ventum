import { water, database } from '../../firebase/firebase';
import { getArrayFromCollection } from '../../helpers/firebaseHelper';
import { WATER_FETCH } from '../types';

export const addWater = newWater => async (dispatch) => {
  water.push().set(newWater);
};

export const completeToDo = completeToDoId => async (dispatch) => {
  water.child(completeToDoId).remove();
};

export const waterSuccess = collection => ({
  type: WATER_FETCH,
  payload: collection,
});

export const fetchWater = () => async (dispatch) => {
  database.collection('water').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push(document.data()));
      dispatch(waterSuccess(collectionList));
    });
};
