import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { updateHabitCompletedForDate } from '../actions/habitsActionCreators';
import { setCurrentAlert } from '../actions/alertsActionCreators';
import { connect } from 'react-redux';

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class Header extends React.Component {
    render() {
      const { onPrev, onNext, year } = this.props;

      let days = DAY_NAMES.map((name, idx) => {
        return <div className="col" key={idx}>
          {name}
        </div>;
      });

      return <div className="text-center font-weight-bold border-bottom">
        <div className="row justify-content-center">
          <span className="mx-5 force-pointer" onClick={onPrev} >{'<'}</span>
          <h2 className="w-50">{`${MONTH_NAMES[this.props.month]} ${year}`}</h2>
          <span className="mx-5 force-pointer" onClick={onNext}>{'>'}</span>
        </div>
        <div className="row font-weight-bolder">
          {days}
        </div>
      </div>;
    }
}

Header.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired
};

class Week extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    let isCompleted = !e.currentTarget.getAttribute('data-is-completed'); // flip the current state;
    let date = e.currentTarget.getAttribute('data-date');
    let { habit, currentUser, dispatch } = this.props;

    dispatch(updateHabitCompletedForDate(habit, isCompleted, date, currentUser))
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    let { startDayMoment: dayMoment, monthMoment, completedDates } = this.props;

    let days = [];
    let lastDayOfMonthMoment = moment(monthMoment).add(1, 'months').subtract(1, 'days');

    for (let i = 0; i < 7; i++) {
      let fullDate = dayMoment.format('YYYY-MM-DD')
      let dayNum = dayMoment.date();
      let fontClass = '';
      let isCompleted = completedDates[fullDate];
      let isInFuture = dayMoment.isAfter(moment(), 'day');

      if (dayMoment.isBefore(monthMoment) || dayMoment.isAfter(lastDayOfMonthMoment)) {
        fontClass = 'font-weight-lighter font-italic';
      } else {
        fontClass = 'font-weight-bold';
      }

      let dayClassMod = isCompleted ? ' circle-day-completed' : ' circle-day-incompleted';
      dayClassMod += isInFuture ? 'light-grey' : ' force-pointer';

      days.push(
        <div className={`col d-flex justify-content-center ${fontClass}`} key={i} data-date={fullDate} data-is-completed={isCompleted} onClick={isInFuture ? null: this.onClick}>
          <div className={`circle day-in-calendar ${dayClassMod} text-center`} style={{ lineHeight: '4em' }}>
            {dayNum}
          </div>
        </div>
      );

      dayMoment = dayMoment.add(1, 'days');
    }

    return <div className="row">
      {days}
    </div>
  }
}

Week.propTypes = {
  startDayMoment: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
}

const WeekContainer = connect(mapStateToProps)(Week);

class MonthDates extends React.Component {
  render() {
    const { year, month, completedDates, habit } = this.props;

    let lastDayOfMonthMoment = moment([year, month]).add(1, 'months').subtract(1, 'days');
    let monthMoment = moment([year, month]);

    let startDayMoment = moment([year, month])
    let domWeek = [];
    let i = 0;

    if (startDayMoment.day() !== 0) {
      startDayMoment = startDayMoment.subtract(startDayMoment.day(), 'days')
    }

    while (startDayMoment.isBefore(lastDayOfMonthMoment) || startDayMoment.isSame(lastDayOfMonthMoment)) {
      domWeek.push(
        <div className="my-3" key={i}>
          <WeekContainer
            startDayMoment={moment(startDayMoment)}
            year={year}
            monthMoment={monthMoment}
            completedDates={completedDates}
            habit={habit} />
        </div>
      );

      startDayMoment = startDayMoment.add(7, 'days');
      i++;
    }

    return domWeek;
  }
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    let date = new Date();
    this.state = {
        year: date.getFullYear(),
        month: date.getMonth()
    };

    this.getPrev = this.getPrev.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  getPrev() {
    let { month, year } = this.state;
    let m = moment([year, month]).subtract(1, 'months');

    this.setState({ month: m.month(), year: m.year() })
  }

  getNext() {
    let { month, year } = this.state;
    let m = moment([year, month]).add(1, 'months');

    this.setState({ month: m.month(), year: m.year() })
  }

  selectDate(year, month, date, element) {}

  render() {
      const { month, year } = this.state;
      const { completedDates, habit } = this.props;

      return (
          <div className="r-calendar text-center">
              <div className="r-inner container">
                  <Header month={month} year={year} onPrev={this.getPrev} onNext={this.getNext} />

                  <MonthDates
                    month={month}
                    year={year}
                    onSelect={this.selectDate}
                    completedDates={completedDates}
                    habit={habit} />
              </div>
          </div>
      );
  }
}

Calendar.propTypes = {
  completedDates: PropTypes.object.isRequired,
  habit: PropTypes.object.isRequired
};

export default Calendar;
