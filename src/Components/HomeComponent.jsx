import React, {Component} from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';

import Loading from './LoadingComponent';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            // set true
            loading : true, 
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
        const { loading, err, errMessage } = this.state;

        if(loading) return <Loading complex = {true}/>

        if(err){
            return (
                <Alert color="danger">
                    Something went wrong please Refresh the page
                    <br/>
                    Error : {errMessage}
                </Alert>
            )
        }
        else{
            return(
                <div>
                    Main
                </div>
            )
        }

    }
}


export default Home;

