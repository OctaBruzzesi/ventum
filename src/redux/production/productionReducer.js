import _ from 'underscore';

import {
  PRODUCTION_FETCH,
  ADD_PRODUCTION_FORM,
  PRODUCTION_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getProduction = state => state.production;

export { getProduction };

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTION_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_PRODUCTION_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case PRODUCTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
