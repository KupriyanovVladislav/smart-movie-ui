import React from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {store} from "../../../store/configureStore";
import {changeUserSuccess} from "../../../shared/actions";
import './page.css';


class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            email: '',
            password: '',
            emailMessage: '',
            passwordMessage: 'Your password must consist of 8 symbols at least.',
            isButtonDisabled: true
        };
    }

    handleClose = () => {
        this.props.changeIsOpen();
    };

    handleEmailInput = (event) => {
        this.setState({...this.state, email: event.target.value});
    };

    handlePasswordInput = (event) => {
        if (event.target.value.length >= 8 && this.state.email)
            this.setState({...this.state, password: event.target.value, isButtonDisabled: false});
        else
            this.setState({...this.state, password: event.target.value});
    };

    confirmAuth = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        const result = await this.props.loginUser(user);
        console.log(result);
        if (result.status === 200) {
            localStorage.setItem('token', result.data.token);
            store.dispatch(changeUserSuccess(result.data.user));
            this.handleClose();
            this.props.history.replace('/');
        }
        else {
            this.setState({
                ...this.state,
                emailMessage: 'Invalid email or password',
                email: '',
                password: '',
                isButtonDisabled: true
            })
            // store.dispatch(changeUserFailure(result.data));
        }
    };

    render() {
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton className='ModalHeader'>Sign In</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Enter email"
                                          value={this.state.email}
                                          onChange={this.handleEmailInput}
                            />
                            <Form.Text className="text-muted">
                                {this.state.emailMessage}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Password"
                                          value={this.state.password}
                                          onChange={this.handlePasswordInput}
                            />
                            <Form.Text className="text-muted">
                                {this.state.passwordMessage}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <Link to='/register'>Don't have an account?</Link>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={this.state.isButtonDisabled} onClick={this.confirmAuth}>
                        Log In
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default withRouter(AuthPage);