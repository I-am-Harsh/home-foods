import React, { Component } from 'react';
import Axios from 'axios';

import RecipeCard from './RecipeCard';
import { Cookies } from 'react-cookie';

class Recipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            current : '',
            err : ''
        }
        this.main = React.createRef();
    }
    componentDidMount(){
        if(this.props.parallaxText !== 'Recipes'){
            this.props.changeParallaxText('Recipes')
        }
        window.addEventListener('scroll',this.handleBottomScroll);

        const session = sessionStorage.getItem('started');
        if(session){
            const homeData = JSON.parse(localStorage.getItem('homeData'));
            this.setState({
                current : homeData
            })
        }
        else{
            Axios.get(`${process.env.REACT_APP_API}/food`)
            .then((response) => {
                const { success, result } = response.data;
                if(success){
                    this.setState({
                        current : result,
                        loading : false
                    })
                }
            })
            .catch(err => {
                this.setState({
                    loading : false,
                    err : true,
                    errMessage : err.message
                })
            }) 
        }
    }

    componentWillUnmount(){
        window.addEventListener('scroll', this.handleBottomScroll);
    }

    handleBottomScroll = () => {
        if(this.main.current){
            const bottom = this.main.current.getBoundingClientRect().bottom <= window.innerHeight;
            if(bottom){
                // api call

            }
        }
    }

    handleDishClick = (dish) => {
        const cookie = new Cookies();
        cookie.set(dish.url,dish);
        this.props.history.push(`/recipes/${dish.url}`);
    }

    displayRecipes = () => {
        if(this.state.current){
            return(
                this.state.current.map((item, index) => {
                    return(
                        <div className = 'col-md-6 col-lg-4' key= {index}>
                            <div className = 'recipe-card' onClick = {() => this.handleDishClick(item)}>
                                <RecipeCard 
                                    dish = {item} 
                                    img='"./parallax.jpg"' 
                                    {...this.props} 
                                />
                            </div>
                            <div style = {{textAlign : 'center'}}>
                                {(new Date()).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    render(){
        if(this.state.current === ''){
            return(
                <div>
                    empty
                </div>
            )
        }

        else{
            return(
                <div className = 'container-fluid' ref = {this.main}>
                    <div className = 'row justify-content-center'>
                        {this.displayRecipes()}
                    </div>
                </div>
            )
        }
    }
}
export default Recipe;