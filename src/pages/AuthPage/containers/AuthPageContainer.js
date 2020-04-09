import React from "react";
import AuthPage from "../components/Page";
import {loginUser} from "../actions";
import {connect} from "react-redux";

class AuthPageContainer extends React.Component {
    render() {
        const { loginUser, changeIsOpen } = this.props;
        return(
            <AuthPage loginUser={loginUser} changeIsOpen={changeIsOpen}/>
        );
    }
}

const mapDispatchToProps = {
    loginUser
};

export default connect(null, mapDispatchToProps)(AuthPageContainer);
