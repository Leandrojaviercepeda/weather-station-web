import { 
  PLANS_RECEIVE, 
  ASSIGN_PLANS_CALL_STATUS, 
  RESET_PLANS_CALL_STATUS, 
  REMOVE_PLANS,
  ADD_PLAN_TO_BE_SUSCRIBED,
  REMOVE_PLAN_TO_BE_SUSCRIBED,
  SET_PLAN_TO_EDIT,
  REMOVE_PLAN_TO_EDIT } from "../actionTypes";

const initialState = {
  availablePlans: null,
  planToBeSuscribed: null,
  planToEdit: null,
  callApi: {
    type: '',
    message: '',
  },
};

export function plansReducer(state = initialState, action) {
  switch (action.type) {
    case PLANS_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        availablePlans: action.plans
      });
    case ASSIGN_PLANS_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: action.status
      });
    case RESET_PLANS_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: {
          type: '',
          message: '',
        }
      });
    case REMOVE_PLANS:
      return Object.assign({}, state, {
        ...state,
        availablePlans: null
      });
    case ADD_PLAN_TO_BE_SUSCRIBED:
      return Object.assign({}, state, {
        ...state,
        planToBeSuscribed: action.plan
      });
    case REMOVE_PLAN_TO_BE_SUSCRIBED:
      return Object.assign({}, state, {
        ...state,
        planToBeSuscribed: null
      });
    case SET_PLAN_TO_EDIT:
      return Object.assign({}, state, {
        ...state,
        planToEdit: action.planToEdit
      });
    case REMOVE_PLAN_TO_EDIT:
      return Object.assign({}, state, {
        ...state,
        planToEdit: null
      });
    default:
      return state;
  }
};