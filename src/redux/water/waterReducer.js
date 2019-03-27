import _ from 'underscore';

import {
  WATER_FETCH,
  ADD_WATER_FORM,
  WATER_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getWater = state => state.water;

export { getWater };

export default (state = initialState, action) => {
  switch (action.type) {
    case WATER_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_WATER_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case WATER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
