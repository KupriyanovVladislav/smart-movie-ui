import React from "react";
import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";


export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    handleClose = (event) => {
        this.setState({show: false});
        this.props.history.goBack();
    };

    render() {
        return (
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <b>Sign In</b>
                    </Modal.Header>

                    <Modal.Body>
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
                                <InputGroup.Text id="password">Password</InputGroup.Text>
                            </InputGroup.Append>
                            <FormControl
                                placeholder="Enter your password"
                            />
                        </InputGroup>
                        <Link to='/register'>Don't have an account?</Link>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

export default withRouter(Page);