import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "../store/configureStore";
import { Provider } from 'react-redux';
import RegisterPageContainer from "../pages/RegisterPage/containers/RegisterPageContainer";
import MainPageContainer from "../pages/MainPage/containers/MainPageContainer";
import MoviePageContainer from "../pages/MoviePage/containers/MoviePageContainer";



class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Provider store={store}>
                <Route exact path='/' component={MainPageContainer} />
                <Route exact path='/register' component={RegisterPageContainer}/>
                <Route exact path='/movies/:id' component={MoviePageContainer}/>
            </Provider>
          </div>
        </Router>
    );
  }
}

export default App;
