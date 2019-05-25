import _ from 'underscore';

import {
  FETCH_FAVOURITES,
  ADD_FAVOURITES,
  DELETE_FAVOURITES,
} from '../types';

const initialState = {
  list: [],
  addSuccess: false,
  deleteSuccess: false,
};

const getFavourites = state => state.favourites;

export { getFavourites };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITES:
      return {
        addSuccess: false,
        deleteSuccess: false,
        list: action.payload,
      };
    case ADD_FAVOURITES:
      return {
        addSuccess: true,
        deleteSuccess: false,
        list: [],
      };
    case DELETE_FAVOURITES:
      return {
        ...state,
        deleteSuccess: true,        
      }
    default:
      return state;
  }
};
