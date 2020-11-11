import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    HomeComposition,
    FarmComposition,
    StatsComposition,
    Pool1Composition,
    Pool2Composition,
    Pool3Composition,
} from 'compositions';

import 'assets/scss/index.scss';

class MainScreen extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={HomeComposition} />
                    <Route path='/farm' exact={true} component={FarmComposition} />
                    <Route path='/farm-meme' exact={true} component={Pool1Composition} />
                    <Route path='/farm-uni' exact={true} component={Pool2Composition} />
                    <Route path='/farm-lp' exact={true} component={Pool3Composition} />
                    <Route path='/stats' exact={true} component={StatsComposition} />
                </Switch>
            </Router>
        );
    }
}

export default MainScreen;