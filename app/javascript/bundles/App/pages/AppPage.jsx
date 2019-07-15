import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import fetchPlus from '../../../helpers/fetch-plus';
import { SET_CURRENT_USER } from '../constants/constants';

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    fetchPlus('http://localhost:3000/sessions')
      .then(res => {
        return res.json();
      })
      .then(res => {
        const { user } = res;

        if (user) {
          return this.props.dispatch({ type: SET_CURRENT_USER, user });
        }

        throw(res.message);
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    return (
        <Router>
          <NavBarContainer />
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route path='/sign-in' component={SignInPage} />
            <Route path='/sign-up' render={() => (<SignInPage type="sign-up" />)} />
          </Switch>
        </Router>
    );
  }
}
