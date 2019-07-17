import PropTypes from 'prop-types';
import React from 'react';

export default class HabitWeekCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { habit: { title, dates } } = this.props;

    let inner = [];

    inner.push(
      <div className="col-5">
        <h5>{title}</h5>
      </div>
    )

    for (let i = 0; i < 6; i++) {
      inner.push(
        <div class="col-1 d-flex flex-column">
          <input type="checkbox"/>
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
