import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import MoviePage from "../components/MoviePage";

class MoviePageContainer extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <MoviePage movieId={this.props.match.params.id}/>
            </div>
        );
    }
}

export default MoviePageContainer;