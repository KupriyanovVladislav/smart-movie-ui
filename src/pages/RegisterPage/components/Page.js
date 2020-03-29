import React from "react";
import {InputGroup, FormControl, Container, Button} from "react-bootstrap";

export class Page extends React.Component {
    render() {
        return(
            <Container>
                <h1>Sign Up</h1>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="username">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Enter your username"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Append>
                        <InputGroup.Text id="email">Email</InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl
                        placeholder="Enter your email"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Append>
                        <InputGroup.Text id="password">Password</InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl
                        placeholder="Enter your password"
                    />
                </InputGroup>
                <Button variant="primary" size="lg" active>
                    Sign Up
                </Button>
            </Container>
        );
    }
}
