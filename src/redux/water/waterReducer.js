import {
  WATER_FETCH,
  WATER_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
};

const getWater = state => state.water;

export { getWater };

export default (state = initialState, action) => {
  switch (action.type) {
    case WATER_FETCH:
      return {
        data: action.payload,
      };
    case WATER_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
