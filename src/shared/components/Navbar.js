import React from 'react';
import {withRouter} from 'react-router-dom';
import {Navbar as Nbar, Nav, FormControl, Form, Button, NavDropdown, NavLink, InputGroup} from 'react-bootstrap';
import AuthPageContainer from "../../pages/AuthPage/containers/AuthPageContainer";
import {store} from "../../store/configureStore";
import {clearUserData} from "../actions";
import "./Navbar.css"
import {faSearch, faFilm, faBookmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isFetching: false,
            search: "",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isFetching !== this.props.isFetching){
            this.setState({...this.state, isFetching: this.props.isFetching});
        }
    }

    handleFormSeacrh = (e) => {
        this.setState({...this.state, search: e.target.value});
    };

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
            <NavDropdown.Item href='/user/favorites/'>My favorites <FontAwesomeIcon icon={faBookmark}/></NavDropdown.Item>
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

    searchMovieByName = (e) => {
        this.props.history.replace(`movies/searchByName/${this.state.search}`);
    };

    render() {
        return (
            <Nbar bg='dark' variant='dark'>
                <Nbar.Brand href='/'><FontAwesomeIcon icon={faFilm}/><b>SmartMovie</b></Nbar.Brand>
                <Nav className="mr-auto" style={{ width: '70%' }}>
                    <Form style = {{ width: '100%'}} className='NavbarForm' onSubmit={this.searchMovieByName}>
                        <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch}/>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="text" placeholder="Search" value={this.state.search}
                                     onChange={this.handleFormSeacrh} />
                        </InputGroup>
                    </Form>
                </Nav>
                {this.props.user.email? this.logged_in_nav(this.props.user.email): this.logged_out_nav(this.state.isFetching)}
                {this.state.isModalOpen && <AuthPageContainer changeIsOpen={this.handleButtonClick}/>}
            </Nbar>
        )
    }
}

export default withRouter(Navbar);
