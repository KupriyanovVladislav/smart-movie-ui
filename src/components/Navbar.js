import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Navbar as Nbar, Nav } from 'react-bootstrap';


class Navbar extends React.Component{
    render() {
        console.log(this.props.isAuth);
        return (
                <Nbar bg='dark' variant='dark'>
                    <Nbar.Brand>
                        <Link to='/'>SmartMovie</Link>
                    </Nbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link to='/auth'>Sign In</Link>
                    </Nav>
                </Nbar>
        )
    }
}

export default withRouter(Navbar);
