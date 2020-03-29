import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store} from "../store/configureStore";
import { Provider } from 'react-redux';
import {Page as MainPage} from "../pages/MainPage/components/Page";
import {Page as AuthPage} from "../pages/AuthPage/components/Page";
import {Page as RegisterPage} from "../pages/RegisterPage/components/Page";
import Navbar from "../components/Navbar";


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Provider store={store}>
                <Navbar/>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/auth' component={AuthPage}/>
                <Route exact path='/register' component={RegisterPage}/>
            </Provider>
          </div>
        </Router>
    );
  }
}

export default App;
