import { biodiversity, database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { BIODIVERSITY_FETCH, ADD_BIODIVERSITY_FORM, EDIT_BIODIVERSITY_SUCCESS } from '../types';

const addBiodiversityForm = form => ({
  type: ADD_BIODIVERSITY_FORM,
  payload: form,
});

const editSuccess = () => ({
  type: EDIT_BIODIVERSITY_SUCCESS,
});

export const addBiodiversity = (newBiodiversity, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;
  database.collection('biodiversity').doc().set({
    ...newBiodiversity,
    user: {
      name,
      lastName,
      role,
      email,
    },
  });
};

export const editBiodiversity = (id, newBiodiversity, user) => async (dispatch) => {
  const {
    name, lastName, email, role,
  } = user;

  database.collection('biodiversity/').doc(id)
    .update({
      ...newBiodiversity,
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
  database.collection('biodiversityForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      dispatch(addBiodiversityForm(formatedData));
    })
    .catch(e => console.log(e));
};

export const addSection = (label, key) => async (dispatch) => {
  database.collection('biodiversityForm').doc(key).set({
    fields: [],
    label,
  }).then(dispatch(fetchDynamicForm()));
};

export const addField = (section, label, key) => async (dispatch) => {
  console.log(section, label, key);
  database.collection('biodiversityForm').get()
    .then((data) => {
      const formatedData = getObjectFromCollection(data);
      const { fields } = formatedData[section];
      const newFields = fields.concat({ label, key, type: 'number ' });
      database.collection('biodiversityForm').doc(section).update({
        fields: newFields,
      }).then(dispatch(fetchDynamicForm()))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
};

export const completeToDo = completeToDoId => async (dispatch) => {
  biodiversity.child(completeToDoId).remove();
};

export const biodiversitySuccess = collection => ({
  type: BIODIVERSITY_FETCH,
  payload: collection,
});

export const fetchBiodiversity = () => async (dispatch) => {
  database.collection('biodiversity').get()
    .then((data) => {
      const collectionList = [];
      data.forEach(document => collectionList.push({ ...document.data(), id: document.id }));
      dispatch(biodiversitySuccess(collectionList));
    });
};

// {
//   key: 'eee',
//   label: 'eesss',
//   type: 'number',
// }
