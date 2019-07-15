import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignIn from './SignIn';
import NavBarContainer from '../containers/NavBarContainer';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
          <NavBarContainer />
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' render={() => (<SignIn type="sign-up" />)} />
          </Switch>
        </Router>
    );
  }
}
