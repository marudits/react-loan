// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES
import PaymentPage from '../pages/PaymentPage';
import LoanPage from '../pages/LoanPage';

// COMPONENT
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
                <Switch>
                    <Route path='/' component={LoanPage} exact={true} />
                    <Route path='/loan' component={LoanPage} />
                    <Route path='/payment' component={PaymentPage} />
                    <Redirect to="/" />
                </Switch>
            <Footer />  
        </Fragment>
    </BrowserRouter>
);