import { environment, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { ENVIRONMENT_FETCH, ADD_ENVIRONMENT_FORM } from '../types';

const addEnvironmentForm = form => ({
  type: ADD_ENVIRONMENT_FORM,
  payload: form,
});

export const addEnvironment = newEnvironment => async (dispatch) => {
  database.collection('environment').doc().set({
    ...newEnvironment,
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
  database.collection('environmentForm').doc(key).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, label, key) => async (dispatch) => {
  console.log(section, label, key);
  database.collection('environmentForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ label, key, type: 'number ' });
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
      data.forEach(document => collectionList.push(document.data()));
      dispatch(environmentSuccess(collectionList));
    });
};
