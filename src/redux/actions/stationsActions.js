import axios from 'axios';
import { 
    WERATHERST_API_URL, 
    SUCCESS, 
    FAILURE } from '../constants';

import { 
    STATIONS_REQUEST, 
    STATIONS_RECEIVE, 
    ASSIGN_STATIONS_CALL_STATUS, 
    RESET_STATIONS_CALL_STATUS,
    SET_STATION_TO_EDIT,
    REMOVE_STATION_TO_EDIT } from '../actionTypes';


function requestStations() {
    return { type: STATIONS_REQUEST }
}

function receiveStations(stations) {
    return { type: STATIONS_RECEIVE, stations }
}

function assignStationsCallStatus(status) {
    return { type: ASSIGN_STATIONS_CALL_STATUS, status }
}

export function resetStationsCallStatus() {
    return { type: RESET_STATIONS_CALL_STATUS }
}

export function setStationtoEdit(station) {
    return { type: SET_STATION_TO_EDIT, station }
}

export function removeStationToEdit() {
    return { type: REMOVE_STATION_TO_EDIT }
}

export const createNewStation = async (dispatch, station) => {
    try {
        dispatch(requestStations())       
        await axios.post(`${WERATHERST_API_URL}/stations`, station)
        dispatch(assignStationsCallStatus({ type: SUCCESS, message: 'Estacion creada exitosamente!' }));
    } catch (error) {
        dispatch(assignStationsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const editStation = async (dispatch, stationToEdit) => {
    try {
        dispatch(requestStations())
        await axios.put(`${WERATHERST_API_URL}/stations/${stationToEdit.id}`, stationToEdit)
        dispatch(assignStationsCallStatus({ type: SUCCESS, message: 'Estacion editada exitosamente!' }));
    } catch (error) {
        dispatch(assignStationsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const deleteStation = async (dispatch, stationId) => {
    try {
        dispatch(requestStations())
        await axios.delete(`${WERATHERST_API_URL}/stations/${stationId}`)
        dispatch(assignStationsCallStatus({ type: SUCCESS, message: 'Estacion borrada exitosamente!' }));
    } catch (error) {
        dispatch(assignStationsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchStations = async (dispatch) => {
    try {
        dispatch(requestStations())
        // GET all stations
        const resFetchStations = await axios.get(`${WERATHERST_API_URL}/stations`)
        const { stations } = resFetchStations.data
        dispatch(receiveStations(stations))
        dispatch(assignStationsCallStatus({ type: SUCCESS, message: 'Estaciones obtenidas exitosamente!' }));
        
    } catch (error) {
        dispatch(assignStationsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}