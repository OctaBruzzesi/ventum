import { store } from '../../App';
import { database } from '../../firebase/firebase';
import { getArrayFromCollection, getObjectFromCollection } from '../../helpers/firebaseHelper';
import { FETCH_FAVOURITES, ADD_FAVOURITES } from '../types';

const addFavouritesSuccess = () => ({
  type: ADD_FAVOURITES,
});

const fetchFavouritesSuccess = data => ({
  type: FETCH_FAVOURITES,
  payload: data,
});

export const addFavourites = (newFavourite, user) => async (dispatch) => {
  database.collection('favourites').doc().set({
    ...newFavourite,
    user,
  })
    .then(() => addFavouritesSuccess());
};

export const fetchFavourites = () => async (dispatch) => {
  const { user } = store.getState().user;
  database.collection('favourites').get()
    .then((data) => {
      const collectionList = [];
      data.forEach((document) => {
        if (document.data().user === user.email) {
          collectionList.push({ ...document.data(), id: document.id });
        }
      });
      
      dispatch(fetchFavouritesSuccess(collectionList));
    });
};
