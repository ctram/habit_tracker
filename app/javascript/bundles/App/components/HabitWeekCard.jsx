import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';
import { clearCurrentAlert } from '../actions/alertsActionCreators';

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

    let { habit, currentUser, dispatch } = this.props;
    let isCompleted = e.target.getAttribute('data-is-completed') === 'true';
    isCompleted = !isCompleted // now update to the opposite state.
    const idx = Number(e.target.getAttribute('data-idx'));
    let { fullDate } = this.props.priorDays[idx];

    dispatch(updateHabitCompletedForDate(habit, isCompleted, fullDate, currentUser));
  }

  render() {
    let { habit: { title, dates, id, num_days_of_longest_streak }, priorDays } = this.props;

    dates = Object.keys(dates);

    let priorDayNums = priorDays.map(day => day.fullDate);
    let inner = [];

    inner.push(
      <div className="col-5" key="title">
        <Link to={`/habits/${id}`} onClick={this.clearCurrentAlert}>
          <h5>{title}</h5>
        </Link>
        <div>
          {`Longest running streak: ${num_days_of_longest_streak} days`}
        </div>
      </div>
    )

    for (let i = 0; i < 6; i++) {
      let isCompleted = dates.indexOf(priorDayNums[i]) > -1;
      let elementClass = "far force-pointer font-size-double";

      elementClass += isCompleted ? " fa-check-square" : " fa-square";

      inner.push(
        <div className="col-1 d-flex flex-column justify-content-center" key={i}>
          <i
            onClick={this.onClick}
            data-is-completed={isCompleted}
            data-idx={i}
            className={elementClass} />
        </div>
      );
    }

    return (
      <div className="card py-3">
        <div className="container">
          <div className="row">
            {inner}
          </div>
        </div>
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
