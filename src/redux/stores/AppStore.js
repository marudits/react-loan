import { createStore, applyMiddleware } from 'redux';

// Middleware
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// Reducers
import { AppReducer } from '../reducers/AppReducer';

export const createAppStore = () => {
    return createStore(AppReducer, applyMiddleware(thunk, promiseMiddleware()));
};