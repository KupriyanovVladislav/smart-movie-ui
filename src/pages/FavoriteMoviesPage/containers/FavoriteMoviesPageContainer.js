import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import FavoriteMoviesPage from "../components/FavoriteMoviesPage";

class FavoriteMoviesPageContainer extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <FavoriteMoviesPage/>
            </div>
        );
    }
}

export default FavoriteMoviesPageContainer;