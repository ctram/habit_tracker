import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';

class DaysInWeek extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { habit, dispatch, currentUser } = this.props;

    let isCompleted = e.currentTarget.getAttribute('data-is-completed') === 'true';
    let date = e.currentTarget.getAttribute('data-date');

    dispatch(updateHabitCompletedForDate(habit, !isCompleted, date, currentUser))
      .catch(e => {
        dispatch(setCurrentAlert('danger', 'There was an error logging your habit. Please refresh the page and try again.'));
        console.error(e);
      });
  }

  render() {
    const { priorDays, numDaysToShow, habit } = this.props;

    let inner = [];

    let i = 0;

    while (i < numDaysToShow) {
      let { dayName, monthNum, dateNum, dayIdx, year, fullDate } = priorDays[priorDays.length - 1 - i];
      let dayCompleted = habit.dates[fullDate];

      dayName = `${dayName[0].toUpperCase()}${dayName.slice(1,3)}`;

      let dayNameClass = '';
      dayNameClass += dayIdx === 0 ? ' text-danger' : '';
      dayNameClass += dayCompleted ? ' day-completed' : '';

      inner.unshift(
        <div className="col" key={i}>
          <div className="d-flex justify-content-center">
            <div className={`day force-pointer d-flex flex-column justify-content-center ${dayNameClass} text-center`} onClick={this.onClick} data-date={fullDate} data-is-completed={dayCompleted}>
              <span className="font-weight-bold">
                {dayName}
              </span>
              <span>
                {`${monthNum}/${dateNum}`}
              </span>
            </div>
          </div>
        </div>
      );

      i++;
    }

    return <div className="days-in-week px-3">
      <div className="row">
        {inner}
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

export default connect(mapStateToProps)(DaysInWeek);
