import { environment, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { convertSection } from '../../utils/sections';
import { ENVIRONMENT_FETCH, ADD_ENVIRONMENT_FORM, EDIT_ENVIRONMENT_SUCCESS } from '../types';

const addEnvironmentForm = form => ({
  type: ADD_ENVIRONMENT_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_ENVIRONMENT_SUCCESS,
});

export const addEnvironment = (newEnvironment, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('environment').doc().set({
    ...newEnvironment,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editEnvironment = (id, newEnvironment, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('environment/').doc(id)
    .update({
      ...newEnvironment,
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
  database.collection('environmentForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addEnvironmentForm(formatedData));
    })
    .catch(e => console.log(e));
};

export const addSection = (label, key) => async (dispatch) => {
  database.collection('environmentForm').doc(key.replace(
    /(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    ),
  ).replace(/\s+/g, '')).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, key, type) => async (dispatch) => {
  database.collection('environmentForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ key: convertSection(key), type });
      database.collection('environmentForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

export const completeToDo = completeToDoId => async (dispatch) => {
  environment.child(completeToDoId).remove();
};

export const environmentSuccess = collection => ({
  type: ENVIRONMENT_FETCH,
  payload: collection,
});

export const fetchEnvironment = () => async (dispatch) => {
  database.collection('environment').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(environmentSuccess(collectionList));
    });
};
