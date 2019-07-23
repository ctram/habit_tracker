import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';
import { clearCurrentAlert } from '../actions/alertsActionCreators';
import DaysInWeek from './DaysInWeek';

class HabitWeekCard extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
  }

  clearCurrentAlert() {
    this.props.dispatch(clearCurrentAlert());
  }

  onClick(e) {
    e.preventDefault();

    this.clearCurrentAlert();

    let { habit, currentUser, dispatch, priorDays } = this.props;
    let isCompleted = e.target.getAttribute('data-is-completed') === 'true';
    isCompleted = !isCompleted // now update to the opposite state.
    const idx = Number(e.target.getAttribute('data-idx'));
    let { fullDate } = this.props.priorDays[idx];

    dispatch(updateHabitCompletedForDate(habit, isCompleted, fullDate, currentUser));
  }

  render() {
    let { habit: { title, dates, id, num_days_longest_streak, num_days_current_streak }, priorDays } = this.props;

    dates = Object.keys(dates);

    let priorDayNums = priorDays.map(day => day.fullDate);
    let daysCheckboxes;

    return (
      <div className="card py-3 habit-week-card">
        <Link to={`/habits/${id}`} onClick={this.clearCurrentAlert}>
          <h5>{title}</h5>
        </Link>
        <DaysInWeek numDaysToShow={2} priorDays={priorDays} dates={dates} habit={this.props.habit} />
        {daysCheckboxes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

let HabitWeekCardContainer = connect(mapStateToProps)(HabitWeekCard);

export default withRouter(HabitWeekCardContainer);
