import React from 'react';
import {withRouter} from 'react-router-dom';
import {Navbar as Nbar, Nav, FormControl, Form, Button, NavDropdown, NavLink} from 'react-bootstrap';
import AuthPageContainer from "../../pages/AuthPage/containers/AuthPageContainer";
import {store} from "../../store/configureStore";
import {clearUserData} from "../actions";


class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isFetching: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isFetching !== this.props.isFetching){
            this.setState({...this.state, isFetching: this.props.isFetching});
        }
    }


    handleButtonClick = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    };

    userLogOut = () => {
        localStorage.removeItem('token');
        store.dispatch(clearUserData());
        this.props.history.replace('/');
    };

    logged_in_nav = (email) => {
        return (
        <NavDropdown title={email} id="basic-nav-dropdown">
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.userLogOut} >Sign Out</NavDropdown.Item>
        </NavDropdown>
    )};

    logged_out_nav = (isFetching) => {
        return(
        <Nav>
            <NavLink onClick={this.handleButtonClick}>{isFetching? "Sign In": "Fetching user..."}</NavLink>
        </Nav>
    )};

    render() {
        return (
            <Nbar bg='dark' variant='dark'>
                <Nbar.Brand href='/'><b>SmartMovie</b></Nbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info" className="mr-sm-5">Search</Button>
                </Form>
                {this.props.user.email? this.logged_in_nav(this.props.user.email): this.logged_out_nav(this.state.isFetching)}
                {this.state.isModalOpen && <AuthPageContainer changeIsOpen={this.handleButtonClick}/>}
            </Nbar>
        )
    }
}

export default withRouter(Navbar);
