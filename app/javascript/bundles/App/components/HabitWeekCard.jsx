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

    const { numDaysToShow, canGoToCalendar } = this.calculateNumDaysToShow();

    this.state = { numDaysToShow, canGoToCalendar };

    this.onClick = this.onClick.bind(this);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
    this.onChangeMedia = this.onChangeMedia.bind(this);
  }

  componentDidMount() {
    window.onresize = this.onChangeMedia;
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  onChangeMedia() {
    const { numDaysToShow, canGoToCalendar } = this.calculateNumDaysToShow();

    this.setState({ numDaysToShow, canGoToCalendar });
  }

  calculateNumDaysToShow() {
    let px = 414;
    let res;
    let numDaysToShow;

    for (let i = 0; i < 20; i++) {
      numDaysToShow = i + 2;
      res = { numDaysToShow, canGoToCalendar:  numDaysToShow > 3 };

      if (matchMedia(`(max-width: ${String(px)}px)`).matches) {
        break;
      }

      px += 150;
    }

    return res;
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
    let { habit: { title, dates, id, num_days_longest_streak, num_days_current_streak } } = this.props;

    let { numDaysToShow, canGoToCalendar } = this.state;

    const titleDom = <h5>{title}</h5>;

    return (
      <div className="card py-5 habit-week-card">
        <div className="mb-3">
          <Link to={`/habits/${id}`} onClick={this.clearCurrentAlert}>
          {titleDom}
          </Link>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col">
              Longest streak: {num_days_longest_streak} days
            </div>
            <div className="col">
              Current streak: {num_days_current_streak} days
            </div>
          </div>
        </div>
        <DaysInWeek numDaysToShow={numDaysToShow} habit={this.props.habit} />
      </div>
    );
  }
}

HabitWeekCard.propTypes = {
  habit: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

export default withRouter(connect(mapStateToProps)(HabitWeekCard));
