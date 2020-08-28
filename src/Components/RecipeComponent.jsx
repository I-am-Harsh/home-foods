import React, { Component } from 'react';
import Axios from 'axios';
import { Skeleton } from '@material-ui/lab';

import RecipeCard from './RecipeCard';
import { Cookies } from 'react-cookie';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            err: '',
            loading: true,
            err: false,
            errMessage: '',
            loadingData: [1, 2, 3],
            skip: 3,
            stopCall: false
        }
        this.main = React.createRef();
        this.skip = 3;
    }
    componentDidMount() {
        if (this.props.parallaxText !== 'Recipes') {
            this.props.changeParallaxText('Recipes')
        }
        window.addEventListener('scroll', this.handleBottomScroll);

        const session = sessionStorage.getItem('started');
        if (session) {
            const homeData = JSON.parse(localStorage.getItem('homeData'));
            this.setState({
                current: homeData,
                loading: false
            })
        }
        else {
            Axios.get(`${process.env.REACT_APP_API}/food`)
                .then((response) => {
                    const { success, result } = response.data;
                    if (success) {
                        sessionStorage.setItem('started', true);
                        this.setState({
                            current: result,
                            loading: false
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        err: true,
                        errMessage: err.message
                    })
                })
        }
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.handleBottomScroll);
    }

    handleBottomScroll = () => {
        if (this.main.current) {
            const bottom = this.main.current.getBoundingClientRect().bottom <= window.innerHeight;
            if (!this.state.stopCall) {
                if (bottom) {
                    this.setState({
                        loading: true
                    })
                    Axios.get(`${process.env.REACT_APP_API}/food/recipes/${this.state.skip}`)
                        .then((response) => {
                            const { success, result } = response.data;
                            if (success) {                                
                                if(result.length > 0){
                                    this.setState(prevState => {
                                        return ({
                                            current: prevState.current.concat(result),
                                            skip: prevState.skip + 3,
                                            loading: !prevState.loading
                                        })
                                    })
                                }
                                else{
                                    this.setState({stopCall : true});
                                }
                            }
                        })
                
                }
            }
            else{
                this.setState({
                    loading : false
                })
                window.removeEventListener('scroll', this.handleBottomScroll);
            }
        }
    }

    handleDishClick = (dish) => {
        const cookie = new Cookies();
        cookie.set(dish.url, dish);
        this.props.history.push(`/recipes/${dish.url}`);
    }

    displayRecipes = () => {
        if (this.state.current) {
            return (
                this.state.current.map((item, index) => {
                    return (
                        <div className='col-md-6 col-lg-4' key={index}>
                            <div className='recipe-card' onClick={() => this.handleDishClick(item)}>
                                <RecipeCard
                                    dish={item}
                                    img='"./parallax.jpg"'
                                    {...this.props}
                                />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                {(new Date()).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2-$1-$3')}
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    render() {
        if (this.state.loading && this.state.current === '') {
            return (
                <div className='row'>
                    {
                        this.state.loadingData.map((item) => {
                            return (
                                <div className='col-md-4 col-sm-12' key={item}>
                                    <div style={{ margin: 20 }}>
                                        <Skeleton variant="rect" height={150} animation="wave" />
                                        <Skeleton variant='text' animation='wave' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        else {
            return (
                <div className='container-fluid' ref={this.main}>
                    <div className='row justify-content-center'>
                        {this.displayRecipes()}
                        {
                            this.state.loading &&
                            this.state.loadingData.map((item) => {
                                return (
                                    <div className='col-md-4 col-sm-12' key={item}>
                                        <div style={{ margin: 20 }}>
                                            <div className='recipe-card'>
                                                <Skeleton variant="rect" height={150} animation="wave" />
                                                <Skeleton variant='text' animation='wave' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}
export default Recipe;