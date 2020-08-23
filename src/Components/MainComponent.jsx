import React, { Component } from 'react'
// import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './HomeComponent';
import Header from './HeaderComponent';


class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: window.location.hostname,
            headerStyle : 'mb-5'
        }
    }

    changeHeaderStyle = (style) => {
        this.setState({
            headerStyle : style
        })
    }    

    render() {
        const { headerStyle } = this.state;
        return (
            <div className = 'main'>
                <div id='heading' className = 'center'>
                    Order. Cook.                    
                </div>
                <div className = 'parallax'/>
                <div className = 'container-fluid'>
                    <BrowserRouter>
                        <Header name = {'Home Foods'} headerStyle = {headerStyle}  />
                        <Switch>
                            <Route path='/' component={(props) => <Home {...props} changeHeaderStyle = {this.changeHeaderStyle} headerStyle = {this.state.headerStyle} />} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default MainComponent;