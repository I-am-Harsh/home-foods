import React, { Component } from 'react';
import axios from 'axios';
import { Alert, Button } from 'reactstrap';
import { Badge } from '@material-ui/core';

import { getHomeData } from '../requests';
import Loading from './LoadingComponent';
import RecipeCard from './RecipeCard';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            errMessage: '',
            data: [1, 2, 3, 4, 5, 6, 6, 7]
        }
        this.homeRef = React.createRef();
    }
    componentDidMount() {
        // window.addEventListener('scroll', this.isInViewport);
        if(this.props.parallaxText !== 'Order. Cook.'){
            this.props.changeParallaxText('Order. Cook.');
        }
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.isInViewport);
    // }

    debounce = (func, delay) => {
        let inDebounce
        return function () {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    throttle = (func, limit) => {
        let lastFunc
        let lastRan
        return function () {
            const context = this
            const args = arguments
            if (!lastRan) {
                func.apply(context, args)
                lastRan = Date.now()
            } else {
                clearTimeout(lastFunc)
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args)
                        lastRan = Date.now()
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    }

    isInViewport = () => {
        const { headerStyle, changeHeaderStyle } = this.props;
        if (this.homeRef.current) {
            const top = this.homeRef.current.getBoundingClientRect().top;
            if (top <= 110) {
                if (headerStyle === 'mb-5') {
                    changeHeaderStyle('dark mb-5');
                }
            }
            else {
                if (headerStyle === 'dark mb-5') {
                    changeHeaderStyle('mb-5');
                }
            }
        }
    }

    apiCall = () => {
        axios.get(`${process.env.REACT_APP_API}/`)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    err: true,
                    errMessage: err
                })
            })
    }

    displayNewBadge = (date) => {
        const dateToday = new Date();
        const dateGiven = new Date(date);
        console.log(dateToday - dateGiven);
        if(dateToday - dateGiven < 7){
            return true
        }
        return false;
    }

    showRecipes = (classes) => {
        if (this.state.loading) {
            // skeleton code
        }
        else {
            return (
                <React.Fragment>
                    <div className='row justify-content-center'>
                        {
                            this.state.data.map((dish, index) => {
                                let badgeContent = '';
                                let badgeColor = '';
                                // if(this.displayNewBadge('23/08/2020')){
                                //     badgeColor = 'error'
                                //     badgeContent = 'New'
                                // }
                                return (
                                    <div className='col-md-4 col-sm-12' key={index}>
                                        <div style = {{margin : 20}}>
                                            <Badge badgeContent={badgeContent} color={badgeColor}>
                                                <RecipeCard dish='"./parallax.jpg"' />
                                            </Badge>
                                            <div style = {{textAlign : 'center'}}>
                                                27 Aug 2020
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='home-button'>
                        View All
                    </button>
                </React.Fragment>
            )
        }
    }

    render() {
        const { loading, err, errMessage } = this.state;

        if (err) {
            return (
                <Alert color="danger" style={{ paddingTop: 80 }} >
                    Something went wrong please Refresh the page
                    <br />
                    Error : {errMessage}
                </Alert>
            )
        }
        else {
            return (
                <div ref={this.homeRef} style = {{paddingTop : '50px'}} >
                    <div style = {{textAlign : 'center', fontWeight : 'bold', fontFamily : 'sans-serif'}}>
                        sollicitudin magna. Vestibulum pulvinar libero nibh,
                        nec ultrices augue rhoncus eu. Donec nec arcu lobortis, ultricies sem sed, rhoncus felis.
                        Curabitur aliquet hendrerit turpis vel ornare. Proin scelerisque congue nunc, in aliquet mauris
                        venenatis vitae. Suspendisse potenti. Mauris rutrum erat a dignissim sollicitudin. Mauris varius
                        magna ac eros sodales accumsan. Donec luctus velit quis ultrices efficitur. Duis at ullamcorper
                        sapien. In quis orci vel eros pellentesque sollicitudin. Phasellus nisl lacus, facilisis at mauris viverra, gravida faucibus est.
                    </div>
                    <div className='home-content'>
                        <h1>
                            Some of our recipes
                        </h1>
                        <div id='recipe'>
                            {this.showRecipes()}
                        </div>
                    </div>
                </div>
            )
        }

    }
}


export default Home;

