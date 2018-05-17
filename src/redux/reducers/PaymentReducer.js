import {
    PAYMENT_ADD, PAYMENT_SET_DETAIL,
} from '../actions/PaymentActions';

const initialState = {
    data: [],
    detail: {
        history: []
    }
};

export const PaymentReducer = (state = initialState, action) => {
    switch(action.type){
        case PAYMENT_ADD:
            return {
                ...state, 
                data: [
                    ...state.data,
                    action.payload
                ]
            };
        case PAYMENT_SET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        default:
            return state;
    }
};