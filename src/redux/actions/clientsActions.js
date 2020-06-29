import axios from 'axios';

import { 
    WERATHERST_API_URL, 
    SUCCESS, 
    FAILURE } from '../constants';

import { 
    CLIENT_REQUEST, 
    CLIENT_RECEIVE, 
    ASSIGN_CLIENT_CALL_STATUS, 
    RESET_CLIENT_CALL_STATUS, 
    REMOVE_CLIENT,
    CLIENTS_RECEIVE } from '../actionTypes';

function requestClient() {
    return { type: CLIENT_REQUEST }
}

function receiveClient(client) {
    return { type: CLIENT_RECEIVE, client: client }
}

function receiveClients(clients) {
    return { type: CLIENTS_RECEIVE, clients }
}

function asignClientCallStatus(status) {
    return { type: ASSIGN_CLIENT_CALL_STATUS, status }
}

export function resetClientCallStatus() {
    return { type: RESET_CLIENT_CALL_STATUS }
}

export function removeClient() {
    return { type: REMOVE_CLIENT }
}

export const registerClient = async (dispatch, account) => {
    try {
        dispatch(requestClient())
        // POST client
        await axios.post(`${WERATHERST_API_URL}/clients`, account)
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Cliente registrado con éxito!' }));
    } catch (error) {
        dispatch(asignClientCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchClient = async (dispatch, email) => {
    try {
        dispatch(requestClient())
        // GET finaluser searcched by email
        const resSearchFinaluserId = await axios.get(`${WERATHERST_API_URL}/finalusers/searchBy?email=${email}`)
        const { id_finaluser } = resSearchFinaluserId.data.finaluser
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Identificador de usuario final obtenido con exito!' }));        
        
        // GET client with id
        const resGetFinaluser = await axios.get(`${WERATHERST_API_URL}/finalusers/${id_finaluser}`)
        const { finaluser } = resGetFinaluser.data
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Usuario final obtenido con exito!' }));        

        // GET client searched by email
        const resSearchClientId = await axios.get(`${WERATHERST_API_URL}/clients/searchBy?email=${email}`)
        const { id_client } = resSearchClientId.data.client
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Identificador de cliente obtenido con exito!' }));

        // GET client with id
        const resGetClient = await axios.get(`${WERATHERST_API_URL}/clients/${id_client}`)
        const { client } = resGetClient.data
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Cliente obtenido con exito!' }));
        dispatch(receiveClient(Object.assign({}, client, finaluser)))
        
    } catch (error) {
        dispatch(asignClientCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const upgradePlan = async (dispatch, idClient, planToSuscribe) => {
    try {
        dispatch(requestClient())
        // PUT client plan to suscribe
        await axios.put(`${WERATHERST_API_URL}/clients/${idClient}`, { plantosuscribe: planToSuscribe })
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Plan Upgradeado con exito!' }));
        
    } catch (error) {
        dispatch(asignClientCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const notifyClient = async (dispatch, idClient) => {
    try {
        dispatch(requestClient())
        // POST client notification
        await axios.get(`${WERATHERST_API_URL}/clients/${idClient}/notify`)
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Cliente notificado con exito!' }));
        
    } catch (error) {
        dispatch(asignClientCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchClients = async (dispatch) => {
    try {
        dispatch(requestClient())
        // POST client notification
        const resSearchClientId = await axios.get(`${WERATHERST_API_URL}/manage/clients`)
        const { clients } = resSearchClientId.data
        dispatch(receiveClients(clients))
        dispatch(asignClientCallStatus({ type: SUCCESS, message: 'Clientes obtenidos con exito!' }));
        
    } catch (error) {
        dispatch(asignClientCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}