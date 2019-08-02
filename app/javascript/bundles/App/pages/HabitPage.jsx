import PropTypes from 'prop-types';
import React from 'react';

import Calendar from '../components/Calendar';

import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as alertsActions from '../actions/alertsActionCreators';
import { fetchHabits, deleteHabit, updateHabit} from '../actions/habitsActionCreators';
import { clearCurrentAlert } from '../actions/alertsActionCreators';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import moment from 'moment';

class Habit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowCalendar: this.shouldShowCalendar(),
      title: props.habit.title,
      isEditMode: false
    };

    this.delete = this.delete.bind(this);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
    this.onChangeMedia = this.onChangeMedia.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    window.onresize = this.onChangeMedia;
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  onChange(e) {
    this.setState({ title: e.target.value });
  }

  onChangeMedia() {
    this.setState({ shouldShowCalendar: this.shouldShowCalendar() });
  }

  shouldShowCalendar() {
    return matchMedia('(min-width: 834px)').matches;
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

  setEditMode(isEditMode) {
    this.setState({ isEditMode });
  }

  submit(e) {
    e.preventDefault();

    const title = this.state.title;
    const { habit, currentUser } = this.props;
    const updatedHabit = Object.assign({}, habit, { title });

    this.props.dispatch(updateHabit(currentUser, updatedHabit))
      .then(() => {
        this.setState({ isEditMode: false });
      });
  }

  cancelEdit() {
    this.setState({ title: this.props.habit.title });
    this.setEditMode(false);
  }

  render() {
    let { habit } = this.props;
    let { shouldShowCalendar, isEditMode, title } = this.state;
    let { dates } = habit;
    let { num_days_current_streak, num_days_longest_streak } = habit;

    let formDom = <div className="d-flex justify-content-center">
      <form className="form-inline" onSubmit={this.submit}>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Habit Title"
          value={title}
          onChange={this.onChange} />

        <button type="submit" className="btn btn-primary mb-2 mr-2" disabled={title === habit.title}>Save</button>
        <button className="btn btn-secondary mb-2" onClick={this.cancelEdit}>Cancel</button>
      </form>
    </div>;

    let titleDom = <div className="text-center">
      <h1 className="text-center mb-3">
      {title}
      </h1>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => { this.setEditMode(true) }}>
          Edit Title
      </button>
    </div>;

    return <div>
      <div className="px-5">
        {
          isEditMode && formDom || titleDom
        }
      </div>

      <div className="my-3 p-5">
        <div className="d-flex justify-content-between">
          <Link className="btn btn-info" to="/" onClick={this.clearCurrentAlert}>
            Back
          </Link>
          <button submit="button" className="btn btn-danger" onClick={this.delete}>
            Delete
          </button>
        </div>
        <div className="my-5">
          <div className="habit-info mb-3">
            <div className="container">
              <div className="row text-center">
                <div className="col">
                  <strong className="mr-1">
                    Longest streak:
                  </strong>
                  {num_days_longest_streak} days
                </div>
                <div className="col">
                  <strong className="mr-1">
                    Current streak:
                  </strong>
                  {num_days_current_streak} days
                </div>
              </div>
            </div>
          </div>
          {
            shouldShowCalendar
              && <div className="card">
                <div className="card-body">
                  <Calendar completedDates={dates} habit={habit} />
                </div>
              </div>
              || "Calendar not show at this resolution, please view this page on a desktop machine."
          }
        </div>
      </div>
    </div>;
  }
}

export default withRouter(connect()(Habit));
