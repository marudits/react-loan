import {
    LOAN_ADD,
} from '../actions/LoanActions';

const initialState = [];

export const LoanReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAN_ADD:
            return [...state, action.payload];
        default:
            return state;
    }
};