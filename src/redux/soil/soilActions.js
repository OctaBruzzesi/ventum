import { soil, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { convertSection } from '../../utils/sections';
import { SOIL_FETCH, ADD_SOIL_FORM, EDIT_SOIL_SUCCESS } from '../types';

const addSoilForm = form => ({
  type: ADD_SOIL_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_SOIL_SUCCESS,
});

export const addSoil = (newSoil, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('soil').doc().set({
    ...newSoil,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editSoil = (id, newSoil, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('soil/').doc(id)
    .update({
      ...newSoil,
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
  database.collection('soilForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addSoilForm(formatedData));
    })
    .catch(e => console.log(e));
};

export const addSection = (label, key) => async (dispatch) => {
  database.collection('soilForm').doc(convertSection(key)).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, key, type) => async (dispatch) => {
  database.collection('soilForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ key: convertSection(key), type });
      database.collection('soilForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

export const completeToDo = completeToDoId => async (dispatch) => {
  soil.child(completeToDoId).remove();
};

export const soilSuccess = collection => ({
  type: SOIL_FETCH,
  payload: collection,
});

export const fetchSoil = () => async (dispatch) => {
  database.collection('soil').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(soilSuccess(collectionList));
    });
};
