import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';

class HabitWeekCard extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();

    let { habit, currentUser, dispatch } = this.props;
    const isCompleted = e.target.checked;
    const idx = Number(e.target.getAttribute('data-idx'));
    let { fullDate } = this.props.priorDays[idx];

    dispatch(updateHabitCompletedForDate(habit, isCompleted, fullDate, currentUser));
  }

  render() {
    let { habit: { title, dates, id }, priorDays } = this.props;

    dates = Object.keys(dates);

    let priorDayNums = priorDays.map(day => day.fullDate);
    let inner = [];

    inner.push(
      <div className="col-5" key="title">
        <Link to={`/habits/${id}`}>
          <h5>{title}</h5>
        </Link>
      </div>
    )

    for (let i = 0; i < 6; i++) {
      inner.push(
        <div className="col-1 d-flex flex-column" key={i}>
          <input type="checkbox" onChange={this.onChange} data-idx={i} checked={dates.indexOf(priorDayNums[i]) > -1} />
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
