import React, { Component } from 'react'
// import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './HomeComponent';
import Header from './HeaderComponent';

class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: window.location.hostname
        }
    }

    // componentDidMount() { }

    render() {
        return (
            <div className = 'container-fluid'>
                <BrowserRouter>
                <Header name = {'Change Name'} />
                    <Switch>
                        <Route path='/' component={(props) => <Home {...props} />} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default MainComponent;