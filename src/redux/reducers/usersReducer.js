import { 
  ADD_CURRENT_USER,
  REMOVE_CURRENT_USER,
  ASSIGN_USER_CALL_STATUS,
  RESET_USER_CALL_STATUS,
  USER_TYPE_RECEIVE,
  REMOVE_TYPE_OF_USER } from "../actionTypes";

const initialState = {
  currentUser: null,
  typeOfUser: null,
  callApi: {
    type: '',
    message: '',
  },
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.user
      });
    case REMOVE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: null
      });
    case USER_TYPE_RECEIVE:
      return Object.assign({}, state, {
        typeOfUser: action.userType
      });
    case ASSIGN_USER_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: action.status
      });
    case RESET_USER_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: {
          type: '',
          message: '',
        }
      });
    case REMOVE_TYPE_OF_USER:
      return Object.assign({}, state, {
        typeOfUser: null
      });
    default:
      return state;
  }
};