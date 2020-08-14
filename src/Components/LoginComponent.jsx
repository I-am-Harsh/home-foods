import React, { Component } from 'react';
import { Form, Input, CardHeader, FormGroup, Button } from 'reactstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            email : '',
            password : '',
            loading : false
        }
    }

    toggle = () => {
        this.setState({
            admin : !this.state.admin
        })
    }

    login = async (event) => {
        event.preventDefault();
        this.setState({loading : true})
        // await this.props.login(this.state.email, this.state.password, this.state.admin);
    }   

    handleInput = (event) => {
        this.setState({
            [event.target.name] : [event.target.value]
        })
    }

    componentDidMount(){
        // if(this.props.home){
        //     this.props.history.push('/');
        // }
    }

    render() {
        return(
            <div class="container-fluid" style={{ marginTop: 80 }}>
                <div className='col-md-4 offset-md-4'>
                    <CardHeader className='mb-4' style = {{textAlign : 'center', background : 'transparent'}}>
                        {this.state.admin ? 'Admin Login' : 'Candidate Login'}
                    </CardHeader>
                    <Form onSubmit = {(e) => this.login(e)}>
                        <FormGroup>
                            <Input type='email' name='email'
                                placeholder='Enter your email'
                                value = {this.state.email}
                                onChange = {(e) => this.handleInput(e)}
                                required 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' name='password' placeholder='Enter your password'
                                value = {this.state.password}
                                onChange = {(e) => this.handleInput(e)}
                                required 
                            />
                        </FormGroup>
                        {
                            this.state.loading ? 
                                <button class="btn btn-success mb-3" type="button" style={{ width: '100%' }} disabled>
                                    <span class="spinner-grow spinner-grow-sm"  role="status" aria-hidden="true"></span>
                                        Loading...
                                </button>
                                :
                                <Button outline color='success' className='mb-3' style={{ width: '100%' }}>
                                    Login
                                </Button>
                        }
                        
                    </Form>
                    <Button outline color='primary' className='mb-3' style={{ width: '100%' }} onClick = {() => this.toggle()}>
                        {
                            this.state.admin ? 'Candidate Login' : 'Admin Login'
                        }
                    </Button>
                    <p style={{ width: '100%' }}>
                        Note : TO LOGIN AS ADMIN <br/>email - verma.harsh98@gmail.com password - asd
                    </p>
                </div>
            </div>
        );
    }
}

export default Login