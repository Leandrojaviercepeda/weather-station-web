import axios from 'axios';
import { 
    WERATHERST_API_URL, 
    SUCCESS, 
    FAILURE } from '../constants';

import { 
    PLANS_REQUEST, 
    PLANS_RECEIVE, 
    ASSIGN_PLANS_CALL_STATUS, 
    RESET_PLANS_CALL_STATUS, 
    REMOVE_PLANS,
    ADD_PLAN_TO_BE_SUSCRIBED,
    REMOVE_PLAN_TO_BE_SUSCRIBED,
    SET_PLAN_TO_EDIT,
    REMOVE_PLAN_TO_EDIT } from '../actionTypes';


function requestPlans() {
    return { type: PLANS_REQUEST }
}

function receivePlans(plans) {
    return { type: PLANS_RECEIVE, plans }
}

function assignPlansCallStatus(status) {
    return { type: ASSIGN_PLANS_CALL_STATUS, status }
}

export function resetPlansCallStatus() {
    return { type: RESET_PLANS_CALL_STATUS }
}

export function removePlans() {
    return { type: REMOVE_PLANS }
}

export function addPlanToBeSuscribed(plan) {
    return { type: ADD_PLAN_TO_BE_SUSCRIBED, plan }
}

export function removePlanToBeSuscribed() {
    return { type: REMOVE_PLAN_TO_BE_SUSCRIBED }
}

export function setPlanToEdit(planToEdit) {
    return { type: SET_PLAN_TO_EDIT, planToEdit }
}

export function removePlanToEdit() {
    return { type: REMOVE_PLAN_TO_EDIT }
}

export const createNewPlan = async (dispatch, plan) => {
    try {
        dispatch(requestPlans())       
        await axios.post(`${WERATHERST_API_URL}/manage/plans`, plan)
        dispatch(assignPlansCallStatus({ type: SUCCESS, message: 'Plan creado exitosamente!' }));
    } catch (error) {
        dispatch(assignPlansCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const editPlan = async (dispatch, planToEdit) => {
    try {
        dispatch(requestPlans())
        await axios.put(`${WERATHERST_API_URL}/manage/plans/${planToEdit.description}`, planToEdit)
        dispatch(assignPlansCallStatus({ type: SUCCESS, message: 'Plan editado exitosamente!' }));
    } catch (error) {
        dispatch(assignPlansCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const deletePlan = async (dispatch, planDescription) => {
    try {
        dispatch(requestPlans())
        await axios.delete(`${WERATHERST_API_URL}/manage/plans/${planDescription}`)
        dispatch(assignPlansCallStatus({ type: SUCCESS, message: 'Plan borrado exitosamente!' }));
    } catch (error) {
        dispatch(assignPlansCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}

export const fetchPlans = async (dispatch) => {
    try {
        dispatch(requestPlans())
        // GET client searched by email
        const resFetchPlans = await axios.get(`${WERATHERST_API_URL}/manage/plans`)    
        const { plans } = resFetchPlans.data
        dispatch(receivePlans(plans))
        dispatch(assignPlansCallStatus({ type: SUCCESS, message: 'Planes obtenidos exitosamente!' }));
        
    } catch (error) {
        dispatch(assignPlansCallStatus({ type: FAILURE, message: error.response.data.message }));
    }
}