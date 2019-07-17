import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';
import HabitsIndexPage from './HabitsIndexPage';
import AlertBar from '../components/AlertBar';
import AddHabitPageContainer from '../containers/AddHabitPageContainer';

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
    const { alert, currentUser } = this.props;

    return (
        <Router>
          <NavBarContainer />
          {
            alert && <AlertBar alertType={alert.alertType} message={alert.message} />
          }
          <div className="py-5">
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/sign-in' component={SignInPage} />
                <Route path='/sign-up' render={() => (<SignInPage type="sign-up" />)} />
                <Route path='/habits/new' component={AddHabitPageContainer} />
                {
                  currentUser &&
                    <Route path='/' component={HabitsIndexPage} /> ||
                    <Route path='/' render={() => ('root when not signed in')} />
                }

            </Switch>
          </div>
        </Router>
    );
  }
}
