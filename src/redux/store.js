import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from '../localstorage';
import _ from 'lodash';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState()

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancer(applyMiddleware(thunk)),
);

// // Store suscriptions
store.subscribe(_.throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;