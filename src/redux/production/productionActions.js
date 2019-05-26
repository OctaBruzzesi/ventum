import { production, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { convertSection } from '../../utils/sections';
import { PRODUCTION_FETCH, ADD_PRODUCTION_FORM, EDIT_PRODUCTION_SUCCESS } from '../types';

const addProductionForm = form => ({
  type: ADD_PRODUCTION_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_PRODUCTION_SUCCESS,
});

export const addProduction = (newProduction, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('production').doc().set({
    ...newProduction,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editProduction = (id, newProduction, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('production/').doc(id)
    .update({
      ...newProduction,
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
  database.collection('productionForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addProductionForm(formatedData));
    })
    .catch(e => console.log(e));
};

export const addSection = (label, key) => async (dispatch) => {
  database.collection('productionForm').doc(convertSection(key)).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, key, type) => async (dispatch) => {
  database.collection('productionForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ key: convertSection(key), type });
      database.collection('productionForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

export const completeToDo = completeToDoId => async (dispatch) => {
  production.child(completeToDoId).remove();
};

export const productionSuccess = collection => ({
  type: PRODUCTION_FETCH,
  payload: collection,
});

export const fetchProduction = () => async (dispatch) => {
  database.collection('production').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(productionSuccess(collectionList));
    });
};
