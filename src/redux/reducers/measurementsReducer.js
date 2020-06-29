import { 
    MEASUREMENTS_RECEIVE, 
    ASSIGN_MEASUREMENTS_CALL_STATUS, 
    RESET_MEASUREMENTS_CALL_STATUS,
    REMOVE_MEASUREMENTS
} from "../actionTypes";
  
  const initialState = {
    measurements: null,
    callApi: {
      type: '',
      message: '',
    },
  };
  
export function measurementsReducer(state = initialState, action) {
    switch (action.type) {
        case MEASUREMENTS_RECEIVE:
            return Object.assign({}, state, {
                ...state,
                measurements: action.measurements
            });
        case ASSIGN_MEASUREMENTS_CALL_STATUS:
            return Object.assign({}, state, {
                ...state,
                callApi: action.status
            });
        case RESET_MEASUREMENTS_CALL_STATUS:
            return Object.assign({}, state, {
                ...state,
                callApi: {
                    type: '',
                    message: '',
                }
            });
        case REMOVE_MEASUREMENTS:
            return Object.assign({}, state, {
                ...state,
                measurements: null
            });
        default:
            return state;
    }
};