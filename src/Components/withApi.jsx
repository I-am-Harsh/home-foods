import React from 'react';
import axios from 'axios';
import { Cookies} from 'react-cookie';

const WithApi = (OriginalComponent) => {
    const apiUrl = process.env.REACT_APP_API;

    class withApi extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                data : '',
                loading: true,
                err: false,
                errMessage: ''
            }
        }

        
        // 9 recipe for homescreen
        getHomeData = () => {
            // session storage;
            const session = sessionStorage.getItem('started');
            if(session){
                const homeData = JSON.parse(localStorage.getItem('homeData'));
                if(homeData){
                    this.setState({
                        data : homeData,
                        loading : false  
                    })       
                }
            }
            else{
                axios.get(`${apiUrl}/food`)
                    .then(response => {
                        const { success, result } = response.data;
                        console.log('erp1')
                        if (success === true) {
                            const cookie = new Cookies();
                            localStorage.setItem('homeData',JSON.stringify(result));
                            sessionStorage.setItem('started',true);
                            this.setState({
                                data: result,
                                loading: false
                            })
                        }
                    })
                    .catch(err => {
                        const homeData = JSON.parse(localStorage.getItem('homeData'));
                        console.log('err caught');
                        if(homeData){
                            sessionStorage.setItem('started',true);
                            console.log('wtf');
                            this.setState({
                                data : homeData,
                                err : true,
                                errMessage : err.message,
                                loading : false
                            });
                        }
                        else{
                            console.log('err2');
                            this.setState({ loading: false, err: true, errMessage: err })
                        }
                    });
            }
        }

        // all recipes
        getRecipe = async () => {
            await axios.get(`${apiUrl}/food/recipes`)
                .then(response => {
                    const { success, result } = response.data;
                    if (success === true) {
                        this.setState({
                            data: result,
                            loading: false
                        })
                    }
                })
                .catch(err => this.setState({ loading: false, err: true, errMessage: err }));
        }

        // get specific dish

        getSpecificDish = (name) => {
            axios.get(`${apiUrl}/food/${name}`)
                .then(response => {
                    const { success, result } = response.data;
                    if (success === true) {
                        this.setState({
                            data: result,
                            loading: false
                        })
                    }
                })
                .catch(err => this.setState({ loading: false, err: true, errMessage: err }));
        }

        // upload recipe

        postRecipe = async () => {
            await axios.post(`${apiUrl}/food/recipes/upload`)
                .then(response => {
                    const { success, result } = response.data;
                    if (success === true) {
                        this.setState({
                            data: result,
                            loading: false
                        })
                    }
                })
                .catch(err => this.setState({ loading: false, err: true, errMessage: err }));
        }
        render() {
            return (
                <OriginalComponent
                    getHomeData={this.getHomeData}
                    postRecipe={this.postRecipe}
                    getSpecificDish={this.getSpecificDish}
                    getRecipe={this.getRecipe}
                    {...this.props}
                    data = {this.state.data}
                    err = {this.state.err}
                    errMessage = {this.state.errMessage}
                    loading = {this.state.loading}
                />
            )
        }
    }
    return withApi;
}

export default WithApi;