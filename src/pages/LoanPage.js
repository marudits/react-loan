import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux
import * as loanActions from '../redux/actions/LoanActions';

// Utils
import { CONFIG } from '../utils/config';
import { formatCurrency } from '../utils/helpers';

class LoanPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            form: {
                loan: {
                    icno: '',
                    name: '',
                    email: '',
                    amount: 0,
                    term: 0
                }
            },
            validation: {
                icno: {
                    status: null,
                    message: null
                },
                name: {
                    status: null,
                    message: null
                },
                email: {
                    status: null,
                    message: null
                },
                amount: {
                    status: null,
                    message: null
                },
                term: {
                    status: null,
                    message: null
                }
            }
        };

        this.validation = {
            icno: {
                status: null,
                message: null
            },
            name: {
                status: null,
                message: null
            },
            email: {
                status: null,
                message: null
            },
            amount: {
                status: null,
                message: null
            },
            term: {
                status: null,
                message: null
            }
        };
    }

    onChangeHandler(key, value){
        let newForm = this.state.form;

        switch(key){
            case 'loan-icno':
                newForm.loan.icno = value;
                break;
            case 'loan-name':
                newForm.loan.name = value;
                break;
            case 'loan-email':
                newForm.loan.email = value;
                break;
            case 'loan-amount':
                newForm.loan.amount = value;
                break;
            case 'loan-term':
                newForm.loan.term = value;
                break;
        }

        this.setState({form: newForm});
    }

    validateForm(){
        let { icno, name, email, amount, term } = this.state.form.loan,
            newValidation = this.state.validation;

        // ic no
        if(!icno && icno.trim().length <= 0){
            newValidation.icno.status = 'invalid';
            newValidation.icno.message = 'IC No is required';
            this.setState({validation: newValidation});
            return false;
        } else if(!icno.match(CONFIG.FORM.VALIDATION.ICNO.RULE)) {
            newValidation.icno.status = 'invalid';
            newValidation.icno.message = 'Please check IC No format';
            this.setState({validation: newValidation});
            return false;
        } else {
            newValidation.icno.status = 'valid';
            newValidation.icno.message = null;
        }

        // name
        if(!name && name.trim().length <= 0){
            newValidation.name.status = 'invalid';
            newValidation.name.message = 'Name is required';
            this.setState({validation: newValidation});
            return false;
        } else {
            newValidation.name.status = 'valid';
            newValidation.name.message = null;
        }

        // email
        if(!email && email.trim().length <= 0){
            newValidation.email.status = 'invalid';
            newValidation.email.message = 'Email is required';
            this.setState({validation: newValidation});
            return false;
        } else if(!email.match(CONFIG.FORM.VALIDATION.EMAIL.RULE)) {
            newValidation.email.status = 'invalid';
            newValidation.email.message = 'Please check email format';
            this.setState({validation: newValidation});
            return false;
        } else {
            newValidation.email.status = 'valid';
            newValidation.email.message = null;
        }

        // email
        if(!amount){
            newValidation.amount.status = 'invalid';
            newValidation.amount.message = 'Amount is required';
            this.setState({validation: newValidation});
            return false;
        } else if(amount < (CONFIG.FORM.VALIDATION.AMOUNT.MIN)) {
            newValidation.amount.status = 'invalid';
            newValidation.amount.message = `Minimum amount is ${CONFIG.FORM.VALIDATION.AMOUNT.MIN}`;
            this.setState({validation: newValidation});
            return false;
        } else if(amount > (CONFIG.FORM.VALIDATION.AMOUNT.MAX)) {
            newValidation.amount.status = 'invalid';
            newValidation.amount.message = `Maximum amount is ${CONFIG.FORM.VALIDATION.AMOUNT.MAX}`;
            this.setState({validation: newValidation});
            return false;
        } else {
            newValidation.amount.status = 'valid';
            newValidation.amount.message = null;
        }

        // email
        if(!term){
            newValidation.term.status = 'invalid';
            newValidation.term.message = 'Term is required';
            this.setState({validation: newValidation});
            return false;
        } else {
            newValidation.term.status = 'valid';
            newValidation.term.message = null;
        }

        return true;
    }

    getLoanId(){
        let timestamp = (new Date().getTime()).toString();
        return `${timestamp.slice(0, 6)}-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    handleSubmit(){
        if(this.validateForm()){
            let formData = this.state.form,
                newData = Object.assign({}, formData.loan, {id: this.getLoanId(), createdAt: new Date()});
            this.props.loanActions.addLoan(newData);
            this.props.history.push({
                pathname: 'payment',
                query: {
                    loanId: newData.id
                }
            });
        }
        
    }

    setTermList(maxTerm, step){
        let period = [], i = step;

        while(i <= maxTerm){
            period.push(i);
            i += step;
        }
        return period;
    }

    render(){
        let { loan } = this.state.form,
            periodList = this.setTermList(60, 6).map(x => (<option value={x} key={x}>{x} months</option>)),
            validation = this.state.validation;

        return(
            <main className="page-loan">
                <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
                    <div className="text-center page-loan__header">
                        <h1>Loan Application</h1>
                        <p>Get loan easily</p>
                    </div>

                    <div className="page-loan__content">
                        <div className="form-group row">
                            <h4>Personal Data</h4>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="loan-icno" className="col-4 col-form-label">IC No</label>
                            <div className="col-8">
                                <input 
                                    type="text" 
                                    className={`form-control is-${validation.icno.status}`}
                                    name="loan-icno" 
                                    id="loan-icno" 
                                    placeholder="xxxxxx-xx-xxxx" 
                                    onChange={(e) => this.onChangeHandler('loan-icno', e.target.value)}
                                    value={loan.icno}/>
                                
                                <div className={`${validation.icno.status}-feedback`}>
                                    {validation.icno.message}
                                </div>
                            </div>
                            
                        </div>

                        <div className="form-group row">
                            <label htmlFor="loan-name" className="col-4 col-form-label">Name</label>
                            <div className="col-8">
                                <input 
                                    type="text" 
                                    className={`form-control is-${validation.name.status}`}
                                    name="loan-name" 
                                    id="loan-name" 
                                    placeholder="John Doe" 
                                    onChange={(e) => this.onChangeHandler('loan-name', e.target.value)}
                                    value={loan.name}
                                    />
                                
                                <div className={`${validation.name.status}-feedback`}>
                                    {validation.name.message}
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="loan-email" className="col-4 col-form-label">Email</label>
                            <div className="col-8">
                                <input 
                                    type="email" 
                                    className={`form-control is-${validation.email.status}`}
                                    name="loan-email" 
                                    id="loan-email" 
                                    placeholder="johndoe@mail.com"
                                    onChange={(e) => this.onChangeHandler('loan-email', e.target.value)}
                                    value={loan.email}
                                    />
                                
                                <div className={`${validation.email.status}-feedback`}>
                                    {validation.email.message}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-loan__content">
                        <div className="form-group row">
                            <h4>Loan Data</h4>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="loan-amount" className="col-4 col-form-label">Amount</label>
                            <div className="input-group col-8">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input 
                                    type="number" 
                                    className={`form-control is-${validation.amount.status}`}
                                    name="loan-amount" 
                                    id="loan-amount"
                                    onChange={(e) => this.onChangeHandler('loan-amount', e.target.value)}
                                    value={loan.amount}
                                    />
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                                
                                <div className={`${validation.amount.status}-feedback`}>
                                    {validation.amount.message}
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="loan-term" className="col-4 col-form-label">Term</label>
                            <div className="col-8">
                                <select className={`custom-select is-${validation.term.status}`} onChange={(e) => this.onChangeHandler('loan-term', e.target.value)}>
                                    <option defaultValue>Choose...</option>
                                    {periodList}
                                </select>
                                <div className={`${validation.term.status}-feedback`}>
                                    {validation.term.message}
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="loan-term" className="col-4 col-form-label">Weekly</label>
                            <div className="col-8">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="loan-weekly" 
                                    id="loan-weekly"
                                    value={loan.amount && loan.term ? formatCurrency((loan.amount/loan.term)) : ''}
                                    readOnly
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="row page-loan__footer">
                        <div className="col-12 text-center">
                            <button className="btn btn-success w-100" onClick={() => this.handleSubmit()}>Apply</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

LoanPage.propTypes = {
    history: PropTypes.object,
    loan: PropTypes.array,
    loanActions: PropTypes.object
};

function mapStateToProps(state){
    return {
        loan: state.loan
    };
}

function mapDispatchToProps(dispatch){
    return {
        loanActions: bindActionCreators(loanActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanPage);