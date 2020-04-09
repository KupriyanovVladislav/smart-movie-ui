import React from "react";
import Navbar from "../components/Navbar";
import {updateUser} from "../actions";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        };
    }

    componentDidMount() {
        const {user, updateUser} = this.props;
        if (!(user.email)) {
            updateUser()
                .then(() => {
                    this.setState({isFetching: true})
                });
        }
    }

    render() {
        return (
            <Navbar isFetching={this.state.isFetching} user={this.props.user} />
        );
    }
}

const mapStateToProps = state => ({
    user: state.shared.user
});

const mapDispatchToProps = {
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);