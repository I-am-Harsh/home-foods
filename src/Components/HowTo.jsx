import React from 'react';

import Loading from './LoadingComponent';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            // set true
            loading : false, 
            err : false,
            errMessage : ''
        }
    }

    // componentDidMount(){
    //     // this.apiCall();
    // }

    apiCall = () => {
        axios.get(`${process.env.REACT_APP_API}/`)
        .then(response  => {
            console.log(response);
        })
        .catch(err => {
            this.setState({
                loading : false,
                err : true,
                errMessage : err
            })
        })
    }

    render(){
        <div>
            How To
        </div>
    }
}


export default Home;

