import React from "react";
import HeaderContainer from "../../../shared/containers/HeaderContainer";
// import Navbar from "../../../shared/components/Navbar";

export class Page extends React.Component {
    render() {
        return (
            <div>
                <HeaderContainer/>
                <h1>Hello world!</h1>
            </div>
        );
    }
}