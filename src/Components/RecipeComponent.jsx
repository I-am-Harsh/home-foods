import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

class Recipe extends Component{

    constructor(props){
        super(props);
        this.state = {
            data : ''
        }
    }

    componentDidMount(){
        if(this.props.parallaxText !== 'Recipes'){
            this.props.changeParallaxText('Recipes')
        }
    }

    render(){
        if(this.state.data === ''){
            return(
                <div>

                </div>
            )
        }

        else{
            return(
                <div className = 'row'>
                    asd
                </div>
            )
        }
    }
}
export default Recipe;