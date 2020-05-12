import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import MoviePage from "../components/MoviePage";
import {connect} from "react-redux";

class MoviePageContainer extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <MoviePage movieId={this.props.match.params.id} user={this.props.user}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.shared.user
});

export default connect(mapStateToProps)(MoviePageContainer);