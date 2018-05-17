import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux
import * as paymentActions from '../redux/actions/PaymentActions';

// Library
import moment from 'moment';

// Utils
import { formatCurrency } from '../utils/helpers';

class PaymentPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            payment: {
                search: ''
            },
            detail: {
                history: []
            },
            status: null
        };
    }

    componentWillMount(){
        if(this.props.location.query && this.props.location.query.loanId){
            let loanId = this.props.location.query.loanId;
            this.setState({payment: {search: loanId}, detail: {id: loanId}});
            this.setPaymentDetail(loanId);
        }
    }

    setPaymentDetail(loanId){
        let loanDetail = this.getLoanDetail(loanId),
            paymentHistory = this.getPaymentHistory(loanId);

        if(loanDetail && paymentHistory){
            let newDetail = Object.assign({},
                {id: loanId},
                loanDetail,
                {
                    history: [...paymentHistory]
                }
            );
            this.props.paymentActions.setPaymentDetail(newDetail);
            this.setState({status: null});
        } else {
            this.setState({status: loanId});
        }
        
    }

    getLoanDetail(loanId){
        return this.props.loan.find(x => x.id === loanId);
    }

    getPaymentHistory(loanId){
        return this.props.payment.data.filter(x => x.loanId === loanId);
    }

    handleRepayment(){
        this.props.paymentActions.addPayment({loanId: this.props.payment.detail.id, amount: 50});
        this.setPaymentDetail(this.props.payment.detail.id);
    }

    handleSearch(){
        this.setPaymentDetail(this.state.payment.search);
    }

    formatCurrency(value, decimal = 2){
        return value ? value.toFixed(decimal) : value;
    }

    onChangeHandler(key, value){
        let newPayment = this.state.payment;
        switch(key){
            case 'payment-search':
                newPayment.search = value;
                break;
        }
        this.setState({payment: newPayment});

    }

    render(){
        let { payment, status } = this.state;
        let { data, detail } = this.props.payment,
            paidPerWeek = parseInt(detail.amount) / parseInt(detail.term);

        return(
            <main className="page-payment">
                <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
                    <div className="text-center page-payment__header">
                        <h1>PaymentPage</h1>
                        <p>Get your payment details</p>
                    </div>
                    <div className="row page-payment__search">
                        <div className="input-group col-12">
                            <input 
                                type="search" 
                                className="form-control" 
                                name="payment-search" 
                                id="payment-search" 
                                placeholder="xxxxxx-xxxxxx" 
                                onChange={(e) => this.onChangeHandler('payment-search', e.target.value)}
                                value={payment.search}/>
                            
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button"
                                    onClick={() => this.handleSearch()}
                                >Search</button>
                            </div>
                        </div>

                        {
                            status ? <p className="col-12 text-center">No result found for loan <span>{status}</span></p> : ''
                        }
                    </div>
                    
                    {
                        (() => {
                            if(!status && detail.id){
                                return(
                                    <div className="row text-center page-payment__content">
                                        <div className="row col-12">
                                            <div className="col-sm-12 col-md-6 content-detail">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="3">Loan Detail</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>ID</th>
                                                            <td>:</td>
                                                            <td>{detail.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>IC No.</th>
                                                            <td>:</td>
                                                            <td>{detail.icno}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Name</th>
                                                            <td>:</td>
                                                            <td>{detail.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Email</th>
                                                            <td>:</td>
                                                            <td>{detail.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Amount</th>
                                                            <td>:</td>
                                                            <td>{parseInt(detail.amount)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Term</th>
                                                            <td>:</td>
                                                            <td>{parseInt(detail.term)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Payment per Week</th>
                                                            <td>:</td>
                                                            <td>{formatCurrency(paidPerWeek)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Applied at</th>
                                                            <td>:</td>
                                                            <td>{moment(detail.createdAt).format('MMM, DD YYYY')}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-sm-12 col-md-6 content-history">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan="2">Payment History</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th><b>No</b></th>
                                                            <td><b>Date Payment</b></td>
                                                        </tr>
                                                        {
                                                            data.map((x, i) => {
                                                                return(
                                                                    <tr key={i}>
                                                                        <th>{i + 1}</th>
                                                                        <td>{ moment(x.createdAt).format('ddd, DD MMM YYYY HH:mm') }</td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-6 col-sm-12 content-status">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="3">Loan Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Loan Total</th>
                                                        <td>:</td>
                                                        <td>{formatCurrency(detail.amount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Loan Paid</th>
                                                        <td>:</td>
                                                        <td>{formatCurrency(paidPerWeek * data.length)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Loan Unpaid</th>
                                                        <td>:</td>
                                                        <td>{formatCurrency(detail.amount - (paidPerWeek * data.length))}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>:</td>
                                                        <td>{ data.length == detail.term ? <b>Completed</b> : 'Not Completed'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            }
                        })()
                    }
                    
                    {
                        (() => {
                            if(!status && detail.id){
                                return(
                                    data.length < detail.term ? 
                                    <div className="row">
                                        <div className="text-center col-12">
                                            <button className="btn btn-success w-100" onClick={() => this.handleRepayment()}>Repayment</button>
                                        </div>
                                    </div>
                                    :
                                    ''
                                );
                            }
                        })()
                    }
                    
                </div>
            </main>
        );
    }
}

PaymentPage.propTypes = {
    history: PropTypes.object,
    payment: PropTypes.object,
    paymentActions: PropTypes.object,
    location: PropTypes.object,
    loan: PropTypes.array
};

function mapStateToProps(state){
    return {
        payment: state.payment,
        loan: state.loan
    };
}

function mapDispatchToProps(dispatch){
    return {
        paymentActions: bindActionCreators(paymentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);