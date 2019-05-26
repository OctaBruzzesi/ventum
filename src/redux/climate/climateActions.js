import { climate, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { convertSection } from '../../utils/sections';
import { CLIMATE_FETCH, ADD_CLIMATE_FORM, EDIT_CLIMATE_SUCCESS } from '../types';

const addClimateForm = form => ({
  type: ADD_CLIMATE_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_CLIMATE_SUCCESS,
});

export const addClimate = (newClimate, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('climate').doc().set({
    ...newClimate,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editClimate = (id, newClimate, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('climate/').doc(id)
    .update({
      ...newClimate,
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
  database.collection('climateForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addClimateForm(formatedData));
    })
    .catch(e => console.log(e));
};

export const addSection = (label, key) => async (dispatch) => {
  database.collection('climateForm').doc(convertSection(key)).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, key, type) => async (dispatch) => {
  database.collection('climateForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ key: convertSection(key), type });
      database.collection('climateForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

export const completeToDo = completeToDoId => async (dispatch) => {
  climate.child(completeToDoId).remove();
};

export const climateSuccess = collection => ({
  type: CLIMATE_FETCH,
  payload: collection,
});

export const fetchClimate = () => async (dispatch) => {
  database.collection('climate').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(climateSuccess(collectionList));
    });
};
