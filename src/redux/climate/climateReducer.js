import _ from 'underscore';

import {
  CLIMATE_FETCH,
  ADD_CLIMATE_FORM,
  CLIMATE_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getClimate = state => state.climate;

export { getClimate };

export default (state = initialState, action) => {
  switch (action.type) {
    case CLIMATE_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_CLIMATE_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case CLIMATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
