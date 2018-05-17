export const LOAN_ADD = 'LOAN_ADD';

export function addLoan(formData){
    return (dispatch) => {
        dispatch({
            type: LOAN_ADD,
            payload: Object.assign({}, formData)
        });
    };
}