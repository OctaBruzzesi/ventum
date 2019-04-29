import { water, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { WATER_FETCH, ADD_WATER_FORM } from '../types';

const addWaterForm = form => ({
  type: ADD_WATER_FORM,
  payload: form,
});

export const addWater = newWater => async (dispatch) => {
  database.collection('water').doc().set({
    ...newWater,
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

export const addSection = (label, key) => async (dispatch) => {
  database.collection('waterForm').doc(key).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, label, key) => async (dispatch) => {
  console.log(section, label, key);
  database.collection('waterForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ label, key, type: 'number ' });
      database.collection('waterForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
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
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(waterSuccess(collectionList));
    });
};

// {
//   key: 'eee',
//   label: 'eesss',
//   type: 'number',
// }
