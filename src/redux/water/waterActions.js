import { water, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { WATER_FETCH, ADD_WATER_FORM } from '../types';

const addWaterForm = form => ({
  type: ADD_WATER_FORM,
  payload: form,
});

export const addWater = newWater => async (dispatch) => {
  const { province, city } = newWater;
  database.collection('water').doc().set({
    ...newWater,
    location: {
      province,
      city,
    },
  });
};

export const fetchDynamicForm = () => async (dispatch) => {
  database.collection('waterForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addWaterForm(formatedData));
    })
    .catch(e => console.log(e));
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
