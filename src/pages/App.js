import React from 'react';
import { Provider } from 'react-redux';

// Redux
import { createAppStore } from '../redux/stores/AppStore';

// Components
import { AppRouter } from '../pages/Router';

export const App = () => (
    <Provider store={createAppStore()}>
        <div className="container">
            <AppRouter />
        </div>
    </Provider>
);