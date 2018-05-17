import { combineReducers } from 'redux';

// Reducers
import { LoanReducer } from './LoanReducer';
import { PaymentReducer } from './PaymentReducer';

export const AppReducer = combineReducers({
    payment: PaymentReducer,
    loan: LoanReducer
});