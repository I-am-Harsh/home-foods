import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { Collapse, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            width: window.innerWidth,
            headerStyle : 'mb-5'
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        window.addEventListener('scroll', this.changeMenuColor);
        console.log(window.screenTop);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
        window.addEventListener('scroll', this.changeMenuColor);
    }

    changeMenuColor = () => {
        if(window.scrollY > 300){
            this.setState({
                headerStyle : 'dark mb-5'
            })
        }
        if(window.scrollY < 200){
            this.setState({
                headerStyle : 'mb-5'
            })
        }
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    logoutClick = () => {
        // logout button
        this.props.logout()
        this.toggleNavbar()
    }

    render() {
        const { width, headerStyle } = this.state;
        const {  name } = this.props;
        var mobile;
        if (width <= 768) {
            mobile = true
        }
        else {
            mobile = false
        }

        // for pc
        if (!mobile) {
            return (
                <Navbar color={headerStyle} dark style={{fontWeight : 'bolder', fontSize : 20}} fixed='top' expand='md'>
                    <div className='container-fluid'>
                        <Link className='navbar-brand' style = {{fontSize : 25}} to={'/'}>{name}</Link>
                        <Nav>
                            <NavItem>
                                <Link className='nav-link' to={'/'}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/recipes'}>
                                    Recipes 
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/about'}>
                                    About
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/contact'}>
                                    Contact
                                </Link>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            );
        }

        // for mobile
        return (
            <div>
                <Navbar color= 'dark mb-5' style = {{fontWeight : 'bolder'}} dark fixed='top'>
                    <Link className='navbar-brand'  to={'/'}>{this.props.name}</Link>
                    <NavbarToggler color = 'white' onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar style={{ color: 'white' }}>
                            <NavItem>
                                <Link className='nav-link' to={'/'} onClick={this.toggleNavbar}>
                                    Home
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/recipes'} onClick={this.toggleNavbar}>
                                    Recipes
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/about'} onClick={this.toggleNavbar}>
                                    About
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link className='nav-link' to={'/contact'} onClick={this.toggleNavbar}>
                                    Contact
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


export default HeaderComponent;

