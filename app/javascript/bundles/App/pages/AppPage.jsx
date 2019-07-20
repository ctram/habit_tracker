import PropTypes from 'prop-types';
import React from 'react';

import Home from '../components/Home';
import SignInPage from './SignInPage';
import NavBarContainer from '../containers/NavBarContainer';
import HabitsIndexPage from './HabitsIndexPage';
import AlertBar from '../components/AlertBar';
import AddHabitPageContainer from '../containers/AddHabitPageContainer';
import HabitPage from '../pages/HabitPage';
import { setHabitsIndex } from '../actions/habitsActionCreators';
import fetchPlus from '../../../helpers/fetch-plus';
import { setCurrentUser } from '../actions/usersActionCreators';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    this.fetchHabits = this.fetchHabits.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  componentDidMount() {
    return this.authenticateUser()
      .then(res => {
        return this.fetchHabits();
      })
      .catch(e => console.error(e));
  }

  authenticateUser() {
    return fetchPlus('${SERVER_DOMAIN}/sessions')
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }

        return {};
      })
      .then(res => {
        const { user } = res;

        if (user) {
          return this.props.dispatch(setCurrentUser(user));
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  fetchHabits() {
    const { currentUser } = this.props;
    let status = null;

    if (!currentUser) {
      return;
    }

    fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`)
      .then(res => {
        status = res.status;

        return res.json();
      })
      .then(res => {
        if (status !== 200) {
          throw(res.message);
        }

        let habits = res.habits;

        this.props.dispatch(setHabitsIndex(habits));
      })
      .catch(e => console.error(e));
  }

  render() {
    const { alert, currentUser, habits } = this.props;

    const habitRoutes = habits.map((habit, idx) => {
        return <Route path={`/habits/${habit.id}`} render={() => (<HabitPage habit={habit} currentUser={currentUser} fetchHabits={this.fetchHabits} />)} key={idx} />;
    });
    return (
        <Router>
          <NavBarContainer />
          {
            alert && <AlertBar alertType={alert.alertType} message={alert.message} />
          }
          <div className="p-5">
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/sign-in' component={SignInPage} />
                <Route path='/sign-up' render={() => (<SignInPage type="sign-up" />)} />
                <Route path='/habits/new' component={AddHabitPageContainer} />
                {
                  currentUser
                    && <Route exact path='/' render={() => (<HabitsIndexPage habits={habits} fetchHabits={this.fetchHabits} />)} />
                        || <Route path='/' render={() => ('root when not signed in')} />
                }
                {
                  currentUser
                    && habitRoutes
                }

            </Switch>
          </div>
        </Router>
    );
  }
}
