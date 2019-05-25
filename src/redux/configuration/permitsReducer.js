import {
  PERMITS_FETCH,
  PERMITS_SUCCESS,
  PERMITS_ERROR,
} from '../types';

const initialState = {
  data: [],
  message: '',
  error: '',
  permitsSuccess: false,
  permitsError: false,
};

const getPermits = state => state.permits;

export { getPermits };

export default (state = initialState, action) => {
  
  switch (action.type) {
    case PERMITS_SUCCESS:
      return {
        data: action.payload,
        message: 'Los permisos han sido configurados con éxito',
        error: '',
        permitsSuccess: true,
        permitsError: false,
      };

      case PERMITS_ERROR:
        return {
          data: [],
          message: '',
          error: 'Ha ocurrido un error al modificar los permisos.',
          permitsSuccess: false,
          permitsError: true,
        };

    default:      
      return state;
  }
};
