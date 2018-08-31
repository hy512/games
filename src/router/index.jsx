import React, { Component } from 'react';

import { Route, Link, HashRouter, BrowserRouter, Redirect, Switch } from 'react-router-dom';


// 引入页面
import Home from '../pages/home/index.jsx';
import Menu from '../pages/menu/index.jsx';
import Game from '../pages/game/index.jsx';
import Help from '../pages/help/index.jsx';



export default class extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/game" component={Game} />
                    <Route path="/help" component={Help} />
                </Switch>
            </HashRouter>
        );
    }
}