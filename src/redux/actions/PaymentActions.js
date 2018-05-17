export const PAYMENT_ADD = 'PAYMENT_ADD';
export const PAYMENT_SET_DETAIL = 'PAYMENT_SET_DETAIL';

export function addPayment(formData){
    return (dispatch) => {
        dispatch({
            type: PAYMENT_ADD,
            payload: Object.assign({}, formData, {id: new Date().getTime(), createdAt: new Date()})
        });
    };
}

export function setPaymentDetail(formData){
    return (dispatch) => {
        dispatch({
            type: PAYMENT_SET_DETAIL,
            payload: Object.assign({}, formData)
        });
    };
}