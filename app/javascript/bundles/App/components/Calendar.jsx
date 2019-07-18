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

      return <div className="text-center font-weight-bold">
        <div className="row justify-content-center">
          <span className="mx-5 force-pointer" onClick={onPrev} >{'<'}</span>
          <h2>{`${MONTH_NAMES[this.props.month]} ${year}`}</h2>
          <span className="mx-5 force-pointer" onClick={onNext}>{'>'}</span>
        </div>
        <div className="row">
          {days}
        </div>
      </div>;
    }
}

class Week extends React.Component {
  render() {
    const { startDay, year, month } = this.props;

    let idxInWeekOfFirstDate = moment([year, month, startDay]).day();
    let days = [];

    for (let i = 0; i < 7; i++) {
      let dayNum;

      if (startDay == 1 && i < idxInWeekOfFirstDate) {
        dayNum = moment([year, month, 1]).subtract(idxInWeekOfFirstDate - i, 'days').date();
      } else {
        dayNum = moment([year, month, startDay]).add(i - idxInWeekOfFirstDate, 'days').date();
      }

      days.push(
        <div className="col" key={i}>
          {dayNum}
        </div>
      );
    }

    return <div className="row">
      {days}
    </div>
  }
}

class MonthDates extends React.Component {
    render() {
      const { year, month } = this.props;

      let numDaysInMonth = moment([year, month]).daysInMonth();

      let numOfWeeks = Math.ceil(numDaysInMonth / 7);

      let domWeek = [];
      let startDay = 1;

      for (let i = 0; i < numOfWeeks; i++) {
        domWeek.push(
          <Week startDay={startDay} year={year} month={month} key={i} />
        );

        startDay += 7;
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
        month: date.getMonth(),
        selectedYear: date.getFullYear(),
        selectedMonth: date.getMonth(),
        selectedDate: date.getDate(),
        selectedDt: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        startDay: 1,
        weekNumbers: false,
        minDate: this.props.minDate ? this.props.minDate : null,
        disablePast: this.props.disablePast ? this.props.disablePast : false,
        dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        firstOfMonth: null,
        daysInMonth: null
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
