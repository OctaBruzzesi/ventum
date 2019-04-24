import {
  PERMITS_FETCH,
  PERMITS_SUCCESS,
  PERMITS_ERRORS,
} from '../types';

const initialState = {
  data: [],
  error: '',
};

const getPermits = state => state.permits;

export { getPermits };

export default (state = initialState, action) => {
  switch (action.type) {
    case PERMITS_SUCCESS:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};
