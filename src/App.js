import React from 'react';

import Router from './router/index.jsx';
import {Provider} from 'react-redux';


// import Router from './router/demo.js';
import {store} from './app/store/storeconfig.js';

import respond from './auto.js';
import "./app.css"

export default function (props) {
    return (
        <Provider store={store}>
        <div className="background">
            <Router />
        </div>
        </Provider>
    );
}


respond();