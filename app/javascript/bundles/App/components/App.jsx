import PropTypes from 'prop-types';
import React from 'react';

import Home from './Home';
import SignIn from './SignIn';
import NavBar from './NavBar'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Router>
            <NavBar />
            <Route exact path='/home' component={Home} />
            <Route path='/sign-in' component={SignIn} />
        </Router>
    );
  }
}
