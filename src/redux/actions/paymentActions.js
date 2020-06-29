import axios from 'axios';
import { 
    MERCADOPAGO_API_URL, 
    MERCADOPAGO_ACCESS_TOKEN, 
    SUCCESS, 
    FAILURE } from '../constants';

import { 
    SET_PAYMENT_METHOD,
    REMOVE_PAYMENT_DATA,
    MERCADOPAGO_REQUEST, 
    MERCADOPAGO_RECEIVE, 
    ASSIGN_PAYMENT_CALL_STATUS, 
    RESET_PAYMENT_CALL_STATUS } from '../actionTypes';


function requestMercadopago() {
    return { type: MERCADOPAGO_REQUEST }
}

function receiveMercadopago(mercadopago) {
    return { type: MERCADOPAGO_RECEIVE, mercadopago }
}

export function removePaymentData() {
    return { type: REMOVE_PAYMENT_DATA }
}

export function setPaymentMethod(method) {
    return { type: SET_PAYMENT_METHOD, method }
}

function asignPaymentCallStatus(status) {
    return { type: ASSIGN_PAYMENT_CALL_STATUS, status }
}

export function resetMercadopagoCallStatus() {
    return { type: RESET_PAYMENT_CALL_STATUS }
}

export const initMercadopagoTransaction = async (dispatch, config) => {
    try {
        dispatch(requestMercadopago())
        // POST mercadopago config
        const resMercadopago = await axios.post(`${MERCADOPAGO_API_URL}/checkout/preferences?access_token=${MERCADOPAGO_ACCESS_TOKEN}`, config)
        const { data } = resMercadopago        
        dispatch(receiveMercadopago(data))
        dispatch(asignPaymentCallStatus({ type: SUCCESS, message: 'Transaccion iniciada con éxito!' }));
    } catch (error) {
        dispatch(asignPaymentCallStatus({ type: FAILURE, message: error.message }));
    }
}
