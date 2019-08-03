import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import priorDaysHelper from '../../../helpers/prior-days'

import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';

import moment from 'moment';

class DaysInWeek extends React.Component {

  constructor(props) {
    super(props);

    const { numDaysToShow } = props;

    this.state = {
      currentDate: moment()
    };

    this.onClick = this.onClick.bind(this);
    this.prevDays = this.prevDays.bind(this);
    this.nextDays = this.nextDays.bind(this);
  }

  prevDays() {
    this.setState({ currentDate: this.state.currentDate.subtract(this.props.numDaysToShow, 'days') });
  }

  nextDays() {
    const { currentDate } = this.state;
    this.setState({ currentDate: this.state.currentDate.add(this.props.numDaysToShow, 'days') });
  }

  onClick(e) {
    const { habit, dispatch, currentUser } = this.props;

    let isCompleted = e.currentTarget.getAttribute('data-is-completed') === 'true';
    let date = e.currentTarget.getAttribute('data-date');

    dispatch(updateHabitCompletedForDate(habit, !isCompleted, date, currentUser))
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    const { numDaysToShow, habit } = this.props;
    const { currentDate } = this.state;

    let priorDays = priorDaysHelper(numDaysToShow, currentDate);

    let inner = [];

    for (let i = 0; i < numDaysToShow; i++) {
      let { dayName, monthNum, dateNum, dayIdx, year, fullDate } = priorDays[i];
      let dayCompleted = habit.dates[fullDate];

      dayName = `${dayName[0].toUpperCase()}${dayName.slice(1,3)}`;

      let dayNameClass = '';
      dayNameClass += dayIdx === 0 ? ' text-danger' : '';
      dayNameClass += dayCompleted ? ' circle-day-completed' : ' circle-day-incompleted';

      inner.push(
        <div className="col" key={i}>
          <div className="d-flex justify-content-center">
            <div className={`circle force-pointer d-flex flex-column justify-content-center ${dayNameClass} text-center`} onClick={this.onClick} data-date={fullDate} data-is-completed={dayCompleted}>
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
    }

    const atInitialDate = currentDate.isSame(moment(), 'day');
    const rightChevronClass = atInitialDate ? ' disabled' : '';

    return <div className="days-in-week px-3">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          <i className="fas fa-chevron-circle-left force-pointer" onClick={this.prevDays} />
        </div>
        {inner}
        <div className="col d-flex align-items-center justify-content-center">
          <i className={`fas fa-chevron-circle-right force-pointer ${rightChevronClass}`} onClick={atInitialDate ? null : this.nextDays} />
        </div>
      </div>
    </div>;
  }
}

DaysInWeek.propTypes = {
  numDaysToShow: PropTypes.number.isRequired,
  habit: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

export default connect(mapStateToProps)(DaysInWeek);
