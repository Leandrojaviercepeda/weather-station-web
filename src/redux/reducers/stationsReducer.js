import { 
    STATIONS_RECEIVE, 
    ASSIGN_STATIONS_CALL_STATUS, 
    RESET_STATIONS_CALL_STATUS,
    SET_STATION_TO_EDIT,
    REMOVE_STATION_TO_EDIT } from "../actionTypes";
  
  const initialState = {
    stations: null,
    stationToEdit: null,
    callApi: {
      type: '',
      message: '',
    },
  };
  
  export function stationsReducer(state = initialState, action) {
    switch (action.type) {
      case STATIONS_RECEIVE:
        return Object.assign({}, state, {
          ...state,
          stations: action.stations
        });
      case ASSIGN_STATIONS_CALL_STATUS:
        return Object.assign({}, state, {
          ...state,
          callApi: action.status
        });
      case RESET_STATIONS_CALL_STATUS:
        return Object.assign({}, state, {
          ...state,
          callApi: {
            type: '',
            message: '',
          }
        });
      case SET_STATION_TO_EDIT:
        return Object.assign({}, state, {
          ...state,
          stationToEdit: action.station
        });
      case REMOVE_STATION_TO_EDIT:
        return Object.assign({}, state, {
          ...state,
          stationToEdit: null
        });
      default:
        return state;
    }
  };