import { water, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { convertSection } from '../../utils/sections';
import { WATER_FETCH, ADD_WATER_FORM, EDIT_WATER_SUCCESS } from '../types';

const addWaterForm = form => ({
  type: ADD_WATER_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_WATER_SUCCESS,
});

export const addWater = (newWater, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('water').doc().set({
    ...newWater,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editWater = (id, newWater, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('water/').doc(id)
    .update({
      ...newWater,
      user: {
        name,
        lastName,
        role,
        email,
      },
    })
    .then(() => {
      dispatch(editSuccess());
    })
    .catch((error) => {
      dispatch(error);
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
  database.collection('waterForm').doc(key.replace(
    /(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ),
  ).replace(/\s+/g, '')).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, key, type) => async (dispatch) => {
  database.collection('waterForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ key: convertSection(key), type });
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
