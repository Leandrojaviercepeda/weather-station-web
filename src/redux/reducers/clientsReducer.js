import { 
  CLIENT_RECEIVE, 
  ASSIGN_CLIENT_CALL_STATUS, 
  RESET_CLIENT_CALL_STATUS, 
  REMOVE_CLIENT,
  CLIENTS_RECEIVE } from "../actionTypes";

const initialState = {
  currentClient: null,
  clients: null,
  callApi: {
    type: '',
    message: '',
  },
};

export function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        currentClient: action.client
      });
    case ASSIGN_CLIENT_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: action.status
      });
    case RESET_CLIENT_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: {
          type: '',
          message: '',
        }
      });
    case REMOVE_CLIENT:
      return Object.assign({}, state, {
        ...state,
        currentClient: null
      });
    case CLIENTS_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        clients: action.clients
      });
    default:
      return state;
  }
};