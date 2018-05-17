import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
    <nav className="navbar navbar-dark bg-dark box-shadow">
        <a className="navbar-brand text-white" href="/">
            <h3>Aspire</h3>
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <div className="nav-link">
                        <NavLink to='/loan' activeClassName='menu selected' exact={true}>Loan</NavLink>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link">
                        <NavLink to='/payment' activeClassName='menu selected'>Payment</NavLink>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
);