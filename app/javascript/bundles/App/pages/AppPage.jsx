import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    return this.props.authenticateUser();
  }

  render() {
    return (
        <Router>
          <NavBarContainer someProps={{ asd: '234234'}}/>
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route path='/sign-in' component={SignInPage} />
            <Route path='/sign-up' render={() => (<SignInPage type="sign-up" />)} />
            <Route path='/' render={() => ('This is root')} />
          </Switch>
        </Router>
    );
  }
}
