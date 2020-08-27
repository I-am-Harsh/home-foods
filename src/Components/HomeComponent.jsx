import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Badge } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Cookies } from 'react-cookie';

import RecipeCard from './RecipeCard';
import withApi from './withApi';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            err: false,
            errMessage: '',
            data: [1, 2, 3, 4, 5, 6, 6, 7, 9]
        }
        this.homeRef = React.createRef();
    }


    componentDidMount() {

        if(this.props.parallaxText !== 'Order. Cook.'){
            this.props.changeParallaxText('Order. Cook.',100);
        }
        this.props.getHomeData();
    }


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

    displayNewBadge = (date) => {
        const dateToday = new Date();
        const dateGiven = new Date(date);
        // console.log(dateGiven);
        // console.log('Diff : ',dateToday - dateGiven);
        if(dateToday - dateGiven < 7){
            return true
        }
        return false;
    }

    handleDishClick = (dish) => {
        const cookie = new Cookies();
        cookie.set(dish.url,dish);
        this.props.history.push(`/recipes/${dish.url}`);
    }

    showRecipes = () => {
        // loading
        if (this.props.loading) {
            return(
                <div className='row justify-content-center'>
                    {
                        this.state.data.map((num, index) => {
                            return(
                                <div className='col-md-4 col-sm-12' key={index}>
                                    <div style = {{margin : 20}}>
                                        <Skeleton variant="rect"  height={150} animation = "wave" />
                                        <Skeleton variant = 'text' animation = 'wave'/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        // display
        else {
            return (
                <React.Fragment>
                    <div className='row justify-content-center'>
                        {
                            this.props.data.map((dish, index) => {
                                let badgeContent = '';
                                let badgeColor = '';
                                // if(this.displayNewBadge(dish.date)){
                                //     badgeColor = 'error'
                                //     badgeContent = 'New'
                                // }
                                // console.log(dish.date);
                                const date = new Date(dish.date);
                                return (
                                    <div className='col-md-6 col-lg-4' key={index}>
                                        <div className = 'recipe-card'>
                                            <Badge badgeContent={badgeContent} 
                                                color={badgeColor} 
                                                onClick = {() => this.handleDishClick(dish)}
                                            >
                                                <RecipeCard 
                                                    dish = {dish} 
                                                    img='"./parallax.jpg"' 
                                                    {...this.props} 
                                                />
                                            </Badge>
                                            <div style = {{textAlign : 'center'}}>
                                                {(new Date()).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}
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
        const { loading, err, errMessage } = this.props;
        if (err) {
            return (
                <Alert color="danger"className = 'error'>
                    Something went wrong please Refresh the page
                    <br />
                    Error : {errMessage.message}
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


export default withApi(Home);

