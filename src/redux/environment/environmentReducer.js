import _ from 'underscore';

import {
  ENVIRONMENT_FETCH,
  ADD_ENVIRONMENT_FORM,
  ENVIRONMENT_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  form: {},
};

const getEnvironment = state => state.environment;

export { getEnvironment };

export default (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ENVIRONMENT_FETCH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_ENVIRONMENT_FORM:
      return {
        ...state,
        form: _.extend({}, state.form, action.payload),
      };
    case ENVIRONMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
