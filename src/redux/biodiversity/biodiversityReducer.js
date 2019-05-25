import _ from 'underscore';

import {
  BIODIVERSITY_FETCH,
  ADD_BIODIVERSITY_FORM,
  BIODIVERSITY_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getBiodiversity = state => state.biodiversity;

export { getBiodiversity };

export default (state = initialState, action) => {
  switch (action.type) {
    case BIODIVERSITY_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_BIODIVERSITY_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case BIODIVERSITY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
