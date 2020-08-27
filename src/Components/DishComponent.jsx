import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import { Alert } from 'reactstrap';

class Dish extends Component {
    constructor(props) {
        super(props);

        const url = window.location.pathname;
        const dishUrl = url.split('/')[2];
        const cookie = new Cookies();
        let dishStored = cookie.get(dishUrl);
        let loading = false;

        if (dishStored === undefined) {
            loading = true;
        }

        this.state = {
            data: dishStored,
            loading: loading,
            // loading : true,
            err: false,
            errMessage: '',
            dishUrl: dishUrl
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.state.data === undefined) {
            axios.get(`${process.env.REACT_APP_API}/food/${this.state.dishUrl}`)
                .then(response => {
                    const { success, result } = response.data;
                    if (success === true) {
                        this.setState({
                            data: result,
                            loading: false
                        }, () => {
                            if (this.props.parallaxText !== this.state.data.displayName) {
                                this.props.changeParallaxText(this.state.data.displayName, 60);
                            }
                        })
                    }
                })
                .catch(err => this.setState({ loading: false, err: true, errMessage: err.message }));
        }
        else {
            if (this.props.parallaxText !== this.state.data.displayName) {
                this.props.changeParallaxText(this.state.data.displayName, 60);
            }
        }
    }

    displayIngredients = (loading) => {
        const { ingredients } = this.state.data
        if (loading) {
            return (
                <React.Fragment>
                    <Skeleton variant='text' animation='wave' />
                    <Skeleton variant='text' animation='wave' />
                    <Skeleton variant='text' animation='wave' />
                </React.Fragment>
            )
        }
        if (this.state.data) {
            return (
                ingredients.map((item, index) => {
                    return (
                        <div style={{ textAlign: 'left' }}>
                            <h4>
                                {item.name}
                            </h4>
                            <ul>
                                {
                                    item.instruction.map((name, index) => (
                                        <li>{name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                })
            )
        }
    }

    displayMethod = (loading) => {
        const { method } = this.state.data;
        if(loading){
            return(
                // <div className = 'col-md-4 offset-md-4'>
                    <React.Fragment>
                        <Skeleton variant='text' width = '100%' animation='wave' />
                        <Skeleton variant='text' width = '100%' animation='wave' />
                        <Skeleton variant='text' width = '100%' animation='wave' />
                    </React.Fragment>
                // </div>
            )
        }
        if (this.state.data) {
            return (
                method.map((item, index) => {
                    return (
                        <div class="col-sm-12 col-md-4 offset-md-4">                        
                            <h3>
                                {item.name}
                            </h3>
                            <ol style={{ textAlign: 'left'}}>
                                {
                                    item.instruction.map((name, index) => (
                                        <li>{name}</li>
                                    ))
                                }
                            </ol>
                        </div>
                    )
                })
            )
        }
    }

    displayDescription = (loading) => {
        if(loading){
            return(
                <Skeleton variant = 'text' height = {100} animation = 'wave'/>
            )
        }
        else{
            return(
                this.state.data.description
            )
        }
    }

    displayImage = (loading) => {
        if(loading){
            return(
                <Skeleton variant = 'rect'  
                    width = '100%'
                    height = {200}
                    animation = 'wave'
                />
            )
        }
        else{
            return(
                <img src='/parallax.jpg' width='100%' />
            )
        }
    }

    render() {
        if (this.state.data) {
            const { displayName, method, ingredients, description } = this.state.data;
            console.log(method);
        }
        if (this.state.loading) {
            return (
                // code for loading
                <div className='container mt-5' style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Verdana' }}>
                    <div className='col mb-5'>
                    {
                        this.displayDescription(true)
                    }
                </div>
                    <div className='col-md-4 offset-md-4 mb-5'>
                        {
                            this.displayImage(true)
                        }
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <h3>
                                    <Skeleton type = 'rect' animation = 'wave'/>
                                </h3>
                                {this.displayIngredients(true)}
                            </div>
                            <div className='col-md-9'>
                                <h2><Skeleton type = 'rect' animation = 'wave'/></h2>
                                {this.displayMethod(true)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.err) {
            return (
                <Alert color="danger" className='error'>
                    Something went wrong please Refresh the page
                    <br />
                    Error : {this.state.errMessage}
                </Alert>
            )
        }
        return (
            <div className='container mt-5' style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Verdana' }}>
                <div className='col mb-5'>
                    {/* {description} */}
                    A simple home made cheese fries with the help of stuff that is easily available in anyone's pantry.
                    This recipes prize itself in being very simple and easy to follow with visible point when something is done.
                </div>
                <div className='col-md-4 offset-md-4 mb-5'>
                    <img src='/parallax.jpg' width='100%' />
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-3'>
                            <h3>Ingredients</h3>
                            {this.displayIngredients()}
                        </div>
                        <div className='col-md-9'>
                            <h2>Method</h2>
                            {this.displayMethod()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dish;