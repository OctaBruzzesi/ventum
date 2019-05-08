import _ from 'underscore';

import {
  FETCH_FAVOURITES,
  ADD_FAVOURITES,
} from '../types';

const initialState = {
  list: [],
  addSuccess: false,
};

const getFavourites = state => state.favourites;

export { getFavourites };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVOURITES:
      return {
        addSuccess: false,
        list: action.payload,
      };
    case ADD_FAVOURITES:
      return {
        addSuccess: true,
        list: [],
      };
    default:
      return state;
  }
};
