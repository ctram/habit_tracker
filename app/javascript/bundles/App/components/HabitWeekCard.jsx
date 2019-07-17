import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class HabitWeekCard extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();

    const { user_id, id } = this.props.habit;
    const isChecked = e.target.checked;
    const idx = Number(e.target.getAttribute('data-idx'));
    let { fullDate } = this.props.priorDays[idx];

    let status;

    fetchPlus(`http://localhost:3000/users/${user_id}/habits/${id}/update_habit_completed_for_date`, {
      method: 'POST',
      body: JSON.stringify({ habit: { id, date: fullDate, completed: isChecked }})
    })
      .then(res => {
        status = res.status;

        return res.json();
      })
      .then(res => {
        return this.props.fetchHabits();
      })
      .catch(e => console.error(e));
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

export default withRouter(HabitWeekCard);
