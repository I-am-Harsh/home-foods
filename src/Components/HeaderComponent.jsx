import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'reactstrap';
import { Collapse, NavbarToggler} from 'reactstrap';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed : false,
            width : window.innerWidth
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };

    toggleNavbar = () =>{
        this.setState({
            collapsed : !this.state.collapsed
        })
    }

    logoutClick = () => {
        // logout button
        this.props.logout() 
        this.toggleNavbar()
    }

    userAction = () => {
        let action = '';
        if(this.props.isLoggedIn){
            if(this.props.admin){
                action = (
                    <NavItem>
                        <Link className='nav-link' to = {'/manage'} onClick={this.toggleNavbar}>
                            Manage
                        </Link>
                    </NavItem>
                )
            }
            else{
                action = (
                    <div>
                        <NavItem>
                            <Link className='nav-link' to = {'/profile'} onClick={this.toggleNavbar}>
                                Profile
                            </Link>
                        </NavItem>
                    </div>
                )
            }
        }
        return action;
    }

    
    render(){
        const width = this.state.width
        var mobile;
        if(width <= 500){
            mobile = true
        }
        else{
            mobile = false
        }


        // for pc
        if(!mobile){
            return(            
                <Navbar color='dark mb-5' light style={{color:'white'}} fixed='top' expand='md'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' style={{color:'white'}} to = {'/'}>{this.props.name}</Link>
                        <Nav>
                            <NavItem>
                                <Link className='nav-link' to = {'/'}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to = {'/leaderboard'}>
                                    Leaderboard
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to = {'/instruction'}>
                                    How To
                                </Link>
                            </NavItem>
                            {
                                this.userAction()
                            }
                            {
                                this.props.isLoggedIn ? 
                                <NavItem>
                                    <input type='button' className='nav-link button-link' onClick={this.props.logout} 
                                        value = 'Logout'
                                    />
                                </NavItem>
                                : 
                                <React.Fragment>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : "/login", state: {signup : false}}}
                                        >
                                            Login
                                        </Link>
                                    </NavItem>
                                </React.Fragment>
                            }
                        </Nav>
                    </div>
                </Navbar>
            );
        }

        // for mobile
        return(
            <div>
                <Navbar color="dark" dark fixed='top'>
                    <Link className='navbar-brand' style={{color:'white'}} to = {'/'}>Candidate Voting</Link>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <Link className='nav-link' to = {'/'} onClick={this.toggleNavbar}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to = {'/leaderboard'} onClick={this.toggleNavbar}>
                                    Leaderboard
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to = {'/instruction'} onClick={this.toggleNavbar}>
                                    Instruction
                                </Link>
                            </NavItem>
                            {
                                this.userAction()
                            }
                            {
                                this.props.isLoggedIn ? 
                                <NavItem>
                                    <input type='button' className='nav-link button-link' 
                                        onClick={this.logoutClick} 
                                        value = 'Logout'
                                    />  
                                </NavItem>
                                : 
                                <React.Fragment>
                                    <NavItem>
                                        <Link className='nav-link' 
                                            to = {{pathname : "/login", state: {signup : false}}} 
                                            onClick={this.toggleNavbar}
                                        >
                                            Login
                                        </Link>
                                    </NavItem>
                                </React.Fragment>   
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default HeaderComponent;

