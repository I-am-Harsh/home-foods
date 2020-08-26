import React, { Component } from 'react';
import { Cookies } from 'react-cookie';

class Dish extends Component {
    constructor(props) {
        super(props);
        const cookie = new Cookies();
        let dishStored = cookie.get('dish');

        this.state = {
            data : dishStored
        }
    }

    componentDidMount(){
        if(this.props.parallaxText !== this.state.data.displayName){
            this.props.changeParallaxText(this.state.data.displayName,60);
        }
    }

    render() {
        const { displayName, method, ingredients, description } = this.state.data;
        return (
            <div className = 'container mt-5' style = {{textAlign : 'center', fontSize : 20, fontFamily : 'Verdana'}}>
                <div className = 'col mb-5'>
                    {/* {description} */}
                    A simple home made cheese fries with the help of stuff that is easily available in anyone's pantry.
                    This recipes prize itself in being very simple and easy to follow with visible point when something is done.
                </div>
                <div className = 'col'>
                    <img src = '/parallax.jpg'/>
                </div>
                <div className = 'col'>
                    <div className = 'row'>
                        <div className = 'col-md-3' style = {{backgroundColor : 'red'}}>
                                asd
                        </div>
                        <div className = 'col-md-9' style = {{backgroundColor : 'green'}}>
                                das
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Dish;