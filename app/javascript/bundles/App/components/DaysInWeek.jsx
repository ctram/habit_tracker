import PropTypes from 'prop-types';
import React from 'react';

class DaysInWeek extends React.Component {
  render() {
    let inner = [];

    inner.push(
      <div className="col-5">
        Padding
      </div>
    )

    for (let i = 0; i < 6; i++) {
      inner.push(
        <div class="col-1 d-flex flex-column">
          <span>
            Wed
          </span>
          <span>
            {`7/${i}`}
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
