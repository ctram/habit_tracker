import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

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
          <h2>{`${MONTH_NAMES[this.props.month]} ${year}`}</h2>
          <span className="mx-5 force-pointer" onClick={onNext}>{'>'}</span>
        </div>
        <div className="row font-weight-bolder">
          {days}
        </div>
      </div>;
    }
}

class Week extends React.Component {
  render() {
    let { startDayMoment: dayMoment, monthMoment } = this.props;

    let days = [];
    let lastDayOfMonthMoment = moment(monthMoment).add(1, 'months').subtract(1, 'days');

    for (let i = 0; i < 7; i++) {
      let dayNum = dayMoment.date();
      let className;

      if (dayMoment.isBefore(monthMoment) || dayMoment.isAfter(lastDayOfMonthMoment)) {
        className = 'font-weight-lighter';
      } else {
        className = 'font-weight-bold';
      }

      days.push(
        <div className={`col ${className}`} key={i}>
          <div className="d-flex justify-content-center">
            <div className="completed-day">
              {dayNum}
            </div>
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

class MonthDates extends React.Component {
    render() {
      const { year, month } = this.props;

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
          <div className="my-1" key={i}>
            <Week startDayMoment={moment(startDayMoment)} year={year} monthMoment={monthMoment} />
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

      return (
          <div className="r-calendar text-center">
              <div className="r-inner container">
                  <Header month={month} year={year} onPrev={this.getPrev} onNext={this.getNext} />

                  <MonthDates
                    month={month}
                    year={year}
                    onSelect={this.selectDate} />
              </div>
          </div>
      );
  }
}

MonthDates.statics = {
   year: new Date().getFullYear(),
   month: new Date().getMonth(),
   date: new Date().getDate(),
   today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
};

export default Calendar;
