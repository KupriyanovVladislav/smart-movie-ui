import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "../store/configureStore";
import { Provider } from 'react-redux';
import {Page as MainPage} from "../pages/MainPage/components/Page";
import RegisterPageContainer from "../pages/RegisterPage/containers/RegisterPageContainer";


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Provider store={store}>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/register' component={RegisterPageContainer}/>
            </Provider>
          </div>
        </Router>
    );
  }
}

export default App;
