import PropTypes from 'prop-types';
import React from 'react';
import priorDaysHelper from '../../../helpers/days-in-week';

class DaysInWeek extends React.Component {
  render() {
    let inner = [];

    let priorDays = priorDaysHelper(6, new Date());

    inner.push(
      <div className="col-5">
        Padding
      </div>
    )

    for (let i = 0; i < 6; i++) {
      let { dayName, monthNum, dateNum, dayIdx } = priorDays[i];

      dayName = `${dayName[0].toUpperCase()}${dayName.slice(1,3)}`;

      let dayNameClass = dayIdx === 0 ? 'text-danger' : null;

      inner.push(
        <div class={`col-1 d-flex flex-column ${dayNameClass}`}>
          <span>
            {dayName}
          </span>
          <span>
            {`${monthNum}/${dateNum}`}
          </span>
        </div>
      );
    }

    return <div className="container">
      <div className="row">
        {inner}
      </div>
    </div>;
  }
}

export default DaysInWeek;
