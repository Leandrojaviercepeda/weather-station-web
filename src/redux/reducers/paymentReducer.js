import { MERCADOPAGO } from '../constants'

import { 
  SET_PAYMENT_METHOD,
  REMOVE_PAYMENT_DATA,
  MERCADOPAGO_RECEIVE, 
  ASSIGN_PAYMENT_CALL_STATUS, 
  RESET_PAYMENT_CALL_STATUS } from "../actionTypes";

const initialState = {
  paymentMethod: MERCADOPAGO,
  paymentData: null,
  callApi: {
    type: '',
    message: '',
  },
};

export function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return Object.assign({}, state, {
        ...state,
        paymentMethod: action.method
      });
    case REMOVE_PAYMENT_DATA:
      return Object.assign({}, state, {
        ...state,
        paymentData: null
      });
    case MERCADOPAGO_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        paymentData: action.mercadopago
      });
    case ASSIGN_PAYMENT_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: action.status
      });
    case RESET_PAYMENT_CALL_STATUS:
      return Object.assign({}, state, {
        ...state,
        callApi: {
          type: '',
          message: '',
        }
      });
    default:
      return state;
  }
};