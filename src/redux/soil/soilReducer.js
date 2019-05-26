import _ from 'underscore';

import {
  SOIL_FETCH,
  ADD_SOIL_FORM,
  SOIL_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getSoil = state => state.soil;

export { getSoil };

export default (state = initialState, action) => {
  switch (action.type) {
    case SOIL_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_SOIL_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case SOIL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
