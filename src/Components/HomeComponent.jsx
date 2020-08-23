import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';

import Loading from './LoadingComponent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // set true
            loading: false,
            err: false,
            errMessage: '',
            dark : true,
            transparent : true
        }
        this.homeRef = React.createRef();
        this.once = 0;
    }
    componentDidMount() {
        window.addEventListener('scroll', this.isInViewport);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.isInViewport);
    }

    isInViewport = () => {
        const { headerStyle, changeHeaderStyle } = this.props;
        if (this.homeRef) {
            const top = this.homeRef.current.getBoundingClientRect().top;
            if(top <= 100){
                if(headerStyle === 'mb-5'){
                    changeHeaderStyle('dark mb-5');
                }
            }
            else{
                if(headerStyle === 'dark mb-5'){
                    changeHeaderStyle('mb-5');
                }
            }
        }
    }

    apiCall = () => {
        axios.get(`${process.env.REACT_APP_API}/`)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    err: true,
                    errMessage: err
                })
            })
    }

    render() {
        const { loading, err, errMessage } = this.state;

        if (loading) return <Loading small />

        if (err) {
            return (
                <Alert color="danger" style={{ paddingTop: 80 }} >
                    Something went wrong please Refresh the page
                    <br />
                    Error : {errMessage}
                </Alert>
            )
        }
        else {
            return (
                <div style={{ height: 1000 }} ref = {this.homeRef} >
                    Main
                </div>
            )
        }

    }
}


export default Home;

