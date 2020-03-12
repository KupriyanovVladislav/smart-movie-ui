import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar as Nbar, Nav } from 'react-bootstrap';

class Navbar extends React.Component{
    render() {
        console.log(this.props.isAuth);
        return (
            <Nbar bg='dark' variant='dark'>
                <Nbar.Brand href="#home">SmartMovie</Nbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href='#signIn'>Sign In</Nav.Link>
                </Nav>
            </Nbar>
        )
    }
}

export default Navbar;
