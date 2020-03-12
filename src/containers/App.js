import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { connect } from "react-redux";


class App extends Component {
  render() {
    return (
      <Navbar isAuth={this.props.isAuth}/>
    );
  }
}

const mapStateToProps = store => {
  return {
    isAuth: store.isAuth,
  }
};

export default connect(mapStateToProps)(App);
