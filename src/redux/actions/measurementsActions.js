import axios from 'axios';
import { 
    WERATHERST_API_URL, 
    SUCCESS, 
    FAILURE } from '../constants';

import { 
    MEASUREMENTS_REQUEST, 
    MEASUREMENTS_RECEIVE, 
    ASSIGN_MEASUREMENTS_CALL_STATUS, 
    RESET_MEASUREMENTS_CALL_STATUS,
    REMOVE_MEASUREMENTS,
} from '../actionTypes';


function requestMeasurements() {
    return { type: MEASUREMENTS_REQUEST }
}

function receiveMeasurements(measurements) {
    return { type: MEASUREMENTS_RECEIVE, measurements }
}

function assignMeasurementsCallStatus(status) {
    return { type: ASSIGN_MEASUREMENTS_CALL_STATUS, status }
}

export function resetMeasurementsCallStatus() {
    return { type: RESET_MEASUREMENTS_CALL_STATUS }
}

export function removeMeasurements() {
    return { type: REMOVE_MEASUREMENTS }
}

export const fetchMeasurementsByStationId = async (dispatch, stationId) => {
    try {
        dispatch(requestMeasurements())
        // GET all stations
        
        const resFetchMeasurements = await axios.get(`${WERATHERST_API_URL}/weather/measurements/relevatedBy?station=${stationId}`)        
        const { measurement } = resFetchMeasurements.data
        dispatch(receiveMeasurements(measurement))
        dispatch(assignMeasurementsCallStatus({ type: SUCCESS, message: 'Medicion obtenida exitosamente!' }));
        
    } catch (error) {
        dispatch(assignMeasurementsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchMeasurementsByPlace = async (dispatch, region, city) => {
    try {
        dispatch(requestMeasurements())
        // GET all stations
        const resFetchMeasurements = await axios.get(`${WERATHERST_API_URL}/weather/measurements/onLocation?region=${region}&city=${city}`)
        const { measurement } = resFetchMeasurements.data
        dispatch(receiveMeasurements(measurement))
        dispatch(assignMeasurementsCallStatus({ type: SUCCESS, message: 'Medicion obtenida exitosamente!' }));
        
    } catch (error) {
        dispatch(assignMeasurementsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchMeasurementsByZipcode = async (dispatch, zipcode) => {
    try {
        dispatch(requestMeasurements())
        // GET all stations
        const resFetchMeasurements = await axios.get(`${WERATHERST_API_URL}/weather/measurements/onLocation?zipcode=${zipcode}`)
        const { measurement } = resFetchMeasurements.data
        dispatch(receiveMeasurements(measurement))
        dispatch(assignMeasurementsCallStatus({ type: SUCCESS, message: 'Medicion obtenida exitosamente!' }));
        
    } catch (error) {
        dispatch(assignMeasurementsCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}