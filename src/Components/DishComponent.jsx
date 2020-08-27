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
            err: false,
            errMessage: '',
            dishUrl: dishUrl
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
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

    displayIngredients = () => {
        const { ingredients } = this.state.data
        if(this.state.data){
            return(
                ingredients.map((item, index) =>{
                    return(
                        <div style = {{textAlign : 'left'}}>
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

    displayMethod = () => {
        const { method } = this.state.data;
        if(this.state.data){
            return(
                method.map((item, index) => {
                    return(
                        <div class="col-md-4 offset-md-4">
                            <h3>
                                {item.name}
                            </h3>
                            <ol style = {{textAlign : 'left', marginLeft : 20}}>
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

    render() {
        if(this.state.data){
            const { displayName, method, ingredients, description } = this.state.data;
            console.log(method);
        }
        if(this.state.loading){
            return(
                <div style = {{display : 'flex', flexDirection : 'column'}}>
                    <div style ={{width : '100%'}}>
                    <Skeleton variant="rect" width = {"100%"}  height={300} animation = "wave" />
                    </div>
                    <div style ={{width : '100%'}}>
                    <Skeleton variant = 'text' animation = 'wave'/>
                    <Skeleton variant = 'text' animation = 'wave'/>
                    <Skeleton variant = 'text' animation = 'wave'/>
                    <Skeleton variant = 'text' animation = 'wave'/>

                    </div>
                </div>
            )
        }
        if(this.state.err){
            return (
                <Alert color="danger"className = 'error'>
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
                    <img src='/parallax.jpg' width = '100%' />
                </div>
                <div className='col'>
                    <div className='row'>
                        <div className='col-md-3'>
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