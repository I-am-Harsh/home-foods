import React, { Component } from 'react'
// import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Home from './HomeComponent';
import Header from './HeaderComponent';
import Recipe from './RecipeComponent';
import Dish from './DishComponent';


class MainComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: window.location.hostname,
            parallaxText: 'Order. Cook.',
            parallaxImg: '/parallax.jpg',
            font : 100
        }
        this.containerRef = React.createRef();
    }


    changeHeaderStyle = (style) => {
        this.setState({
            headerStyle: style
        })
    }

    changeParallaxText = (text, num) => {
        const font = num || 100;
        this.setState({
            parallaxText: text,
            font : font
        })
    }

    render() {
        const { headerStyle, parallaxText, parallaxImg } = this.state;
        return (
            <div className='main'>
                <div id='heading' className='center' style = {{fontSize: this.state.font}}>
                    {parallaxText}
                </div>
                <div className='scrollDown'>
                    <IconButton onClick={() => window.scrollTo(0, this.containerRef.current.offsetTop - 63)} >
                        <KeyboardArrowDownIcon fontSize='large' style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <div className='parallax' style={{ backgroundImage: `url(${parallaxImg})` }} />
                <div className='container' ref={this.containerRef}>
                    <BrowserRouter>
                        <Header name={'Home Foods'} headerStyle={headerStyle} />
                        <Switch>
                            <Route exact path='/'
                                component={(props) => <Home {...props}
                                    parallaxText = {this.state.parallaxText}
                                    changeParallaxText={this.changeParallaxText}
                                />
                                }
                            />
                            <Route exact path='/recipes/*'
                                component={(props) => <Dish {...props}
                                    changeParallaxText={this.changeParallaxText}
                                    parallaxText = {this.state.parallaxText}
                                    changeParallaxFont = {this.changeParallaxFont}
                                />
                                }
                            />
                            <Route exact path='/recipes'
                                component={(props) => <Recipe {...props}
                                    changeParallaxText={this.changeParallaxText}
                                    parallaxText = {this.state.parallaxText}
                                />
                                }
                            />
                            {/* <Route exact path='/about'
                                component={(props) => <Recipe {...props}
                                    changeParallaxText={this.changeParallaxText}
                                    parallaxText = {this.state.parallaxText}
                                />
                                }
                            />
                            <Route exact path='/contact'
                                component={(props) => <Recipe {...props}
                                    changeParallaxText={this.changeParallaxText}
                                    parallaxText = {this.state.parallaxText}
                                />
                                }
                            /> */}
                        </Switch>
                    </BrowserRouter>
                </div>
                {/* <div className='parallax' style={{ backgroundImage: `url(${parallaxImg})` }} /> */}
            </div>
        );
    }
}

export default MainComponent;