import {
  PERMITS_FETCH,
  PERMITS_SUCCESS,
  PERMITS_ERROR,
} from '../types';

const initialState = {
  data: [],
  error: '',
  permitsSuccess: false,
};

const getPermits = state => state.permits;

export { getPermits };

export default (state = initialState, action) => {
  switch (action.type) {
    case PERMITS_SUCCESS:
      return {
        data: action.payload,
        permitsSuccess: true,
      };

      case PERMITS_ERROR:
        return {
          data: [],
          error: 'Ha ocurrido un error al modificar los permisos.',
          permitsSuccess: false,
        };

    default:
      return state;
  }
};
