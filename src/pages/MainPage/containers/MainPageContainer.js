import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
import Gallery from "../components/Gallery";

class MainPageContainer extends React.Component{
    render() {
        return (
            <div>
                <HeaderContainer/>
                <Gallery/>
            </div>
        )
    }

}

export default MainPageContainer;