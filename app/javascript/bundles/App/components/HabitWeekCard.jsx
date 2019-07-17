import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';

export default class HabitWeekCard extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    const { user_id, id } = this.props.habit;
    const isChecked = e.target.checked;
    const idx = Number(e.target.getAttribute('data-idx'));
    let { dateNum, monthNum, year } = this.props.priorDays[idx];

    monthNum = String(monthNum).length < 2 ? `0${monthNum}` : monthNum;
    dateNum = String(dateNum).length < 2 ? `0${dateNum}` : dateNum;

    const fullDate = `${year}-${monthNum}-${dateNum}`;

    let status;

    let action = isChecked === true ? 'complete' : 'uncomplete';

    fetchPlus(`http://localhost:3000/users/${user_id}/habits/${id}/${action}`, {
      method: isChecked ? 'POST' : 'DELETE',
      body: JSON.stringify({ habit: { id, date: fullDate, completed: isChecked }})
    })
      .then(res => {
        status = res.status;

        return res.json();
      })
      .then(res => {
        this.props.history('/');
      })
      .catch(e => console.error(e));
  }

  render() {
    const { habit: { title, dates } } = this.props;

    let inner = [];

    inner.push(
      <div className="col-5" key="title">
        <h5>{title}</h5>
      </div>
    )

    for (let i = 0; i < 6; i++) {
      inner.push(
        <div className="col-1 d-flex flex-column" key={i}>
          <input type="checkbox" onClick={this.onClick} data-idx={i} />
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
