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
        console.log('mounted')
        console.log(this.state.data);
        if(this.props.parallaxText !== this.state.data.displayName){
            this.props.changeParallaxText(this.state.data.displayName,60);
        }
    }

    render() {
        const { displayName, method, ingredients, description } = this.state.data;
        return (
            <div className = 'container'>
                <div>
                    {description}
                </div>
            </div>
        );
    }
}

export default Dish;