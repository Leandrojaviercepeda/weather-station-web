import axios from 'axios';

import { 
    WERATHERST_API_URL, 
    SUCCESS,
    FAILURE } from '../constants';

import { 
    ADD_CURRENT_USER, 
    REMOVE_CURRENT_USER,
    USER_REQUEST,
    USER_TYPE_RECEIVE,
    ASSIGN_USER_CALL_STATUS,
    RESET_USER_CALL_STATUS,
    REMOVE_TYPE_OF_USER } from '../actionTypes'

export function addCurrentUser(user) {
    return { type: ADD_CURRENT_USER, user }
}

export function removeCurrentUser() {
    return { type: REMOVE_CURRENT_USER }
}

function requestUser() {
    return { type: USER_REQUEST }
}

function receiveTypeOfUser(userType) {
    return { type: USER_TYPE_RECEIVE, userType }
}

export function removeTypeOfUser() {
    return { type: REMOVE_TYPE_OF_USER }
}

function asignUserCallStatus(status) {
    return { type: ASSIGN_USER_CALL_STATUS, status }
}

export function resetUserCallStatus() {
    return { type: RESET_USER_CALL_STATUS }
}


export const fetchTypeOfUser = async (dispatch, email) => {
    try {
        dispatch(requestUser())
        // GET finaluser id searched by email
        const resFinaluserfUser = await axios.get(`${WERATHERST_API_URL}/finalusers/searchBy?email=${email}`)
        console.log(resFinaluserfUser);
        
        const { id_finaluser } = resFinaluserfUser.data.finaluser



        // GET finaluser type searched by id
        const resTypeOfUser = await axios.get(`${WERATHERST_API_URL}/finalusers/${id_finaluser}/type`)
        const { finaluser } = resTypeOfUser.data
        dispatch(receiveTypeOfUser(finaluser.type))
        dispatch(asignUserCallStatus({ type: SUCCESS, message: 'Tipo de usuario obtenido con exito!' }));
        
    } catch (error) {
        dispatch(asignUserCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}