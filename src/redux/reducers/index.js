import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { clientsReducer } from './clientsReducer';
import { plansReducer } from './plansReducer';
import { paymentReducer } from './paymentReducer';
import { stationsReducer } from './stationsReducer';
import { measurementsReducer } from './measurementsReducer';

export default combineReducers({ 
    users: usersReducer, 
    clients: clientsReducer, 
    plans: plansReducer, 
    payment: paymentReducer,
    stations: stationsReducer,
    measurements: measurementsReducer,
});