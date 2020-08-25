import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';

// const Recipe = (props) => {

//     const [data,setData] = useState('');

//     // useEffect(() => {
//     //     props.changeParallaxText('Recipes');
//     // })
//         // axios.get()
//         // .then(result => {
//         //     setData(result.result);
//         // })
        
    

//     // loading
//     if(data === ''){
//         return(
//             <div></div>       
//         )
//     }

//     else{
//         return(
//             <div className = 'row'>
//                 asd
//             </div>
//         )
//     }
    
// }

class Recipe extends Component{

    constructor(props){
        super(props);
        this.state = {
            data : ''
        }
    }

    componentDidMount(){
        if(this.props.parallaxText !== 'Recipe'){
            this.props.changeParallaxText('Recipe')
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