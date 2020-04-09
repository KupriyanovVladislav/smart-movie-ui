import React from "react";
import {connect} from "react-redux";
import {registerUser} from "../actions";
import RegisterPage from "../components/Page";

class RegisterPageContainer extends React.Component {
    render() {
        return (
            <RegisterPage registerUser={this.props.registerUser}/>
        )
    }
}

const mapDispatchToProps = {
    registerUser
};

export default connect(null, mapDispatchToProps)(RegisterPageContainer);