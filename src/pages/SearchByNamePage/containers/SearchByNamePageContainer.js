import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import SearchByNamePage from "../components/SearchByNamePage";

class SearchByNamePageContainer extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <SearchByNamePage search={this.props.match.params.name}/>
            </div>
        );
    }
};

export default SearchByNamePageContainer;