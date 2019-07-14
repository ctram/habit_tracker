import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignIn from '../components/SignIn';
import NavBar from '../components/NavBar'

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
