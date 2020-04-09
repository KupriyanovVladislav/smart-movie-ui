import React from "react";
import {Container, Button, Form} from "react-bootstrap";
import {store} from "../../../store/configureStore";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import {changeUserSuccess, changeUserFailure} from "../../../shared/actions";
import {withRouter} from 'react-router-dom';
import './page.css'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailMessage: "We'll never share your email with anyone else.",
            passwordMessage: "At least 8 symbols (including letters and digits)."
        }
    }

    confirmRegister = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        const result = await this.props.registerUser(user);
        console.log(result);
        if (result.status === 201){
            localStorage.setItem('token', result.data.token);
            store.dispatch(changeUserSuccess(result.data));
            this.props.history.replace('/');
        }
        else {
            if (result.data.hasOwnProperty('email')){
                const message = result.data.email[0];
                this.setState({
                    ...this.state,
                    emailMessage: message.toUpperCase(),
                    email: '',
                    password: ''
                })
            }
            else if (result.data.hasOwnProperty('password')) {
                const message = result.data.password[0];
                this.setState({
                    ...this.state,
                    emailMessage: 'Email is correct',
                    password: '',
                    passwordMessage: message
                })
            }
            store.dispatch(changeUserFailure(result.data))
        }
    };

    handleEmailInput = (event) => {
        this.setState({...this.state, email: event.target.value});
    };

    handlePasswordInput = (event) => {
        this.setState({...this.state, password: event.target.value});
    };

    render() {
        return(
            <div>
                <HeaderContainer/>
                <Container className='registerContainer'>
                    <h1>SIGN UP</h1>
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
                        <Button variant="primary" onClick={this.confirmRegister}>
                            Submit
                        </Button >
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(RegisterPage);