import PropTypes from 'prop-types';
import React from 'react';

import Calendar from '../components/Calendar';

import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as alertsActions from '../actions/alertsActionCreators';
import { fetchHabits, deleteHabit } from '../actions/habitsActionCreators';
import { clearCurrentAlert } from '../actions/alertsActionCreators';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import moment from 'moment';

class Habit extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
  }

  delete() {
    this.clearCurrentAlert();

    const { currentUser, habit, fetchHabits, dispatch } = this.props;

    const result = window.confirm('Are you sure you want to delete this habit? This cannot be undone.');

    if (!result) {
      return;
    }

    dispatch(deleteHabit(currentUser, habit))
      .then(() => {
        this.props.history.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  }

  clearCurrentAlert() {
    this.props.dispatch(clearCurrentAlert());
  }

  render() {
    let { habit } = this.props;
    let { title, dates } = habit;

    const showCalendar = matchMedia(`(min-width: 834px)`).matches;

    return <div>
      <h1 className="text-center">
        {title}
      </h1>

      <div className="my-3 p-5">
        <div className="d-flex justify-content-between">
          <Link className="btn btn-info" to="/" onClick={this.clearCurrentAlert}>
            Back
          </Link>
          <button submit="button" className="btn btn-danger" onClick={this.delete}>
            Delete
          </button>
        </div>
        {
          showCalendar
            && <div className="card my-5">
              <div className="card-body">
                <Calendar completedDates={dates} habit={habit} />
              </div>
            </div>
            || <div className="my-5">
              Calendar not show at this resolution, please view this page on a desktop machine.
            </div>
        }

      </div>
    </div>;
  }
}

export default withRouter(connect()(Habit));
