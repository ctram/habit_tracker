import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as alertsActions from '../actions/alertsActionCreators';
import Calendar from '../components/Calendar';

class Habit extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  delete() {
    const { currentUser, habit, fetchHabits } = this.props;

    fetchPlus(`http://localhost:3000/users/${currentUser.id}/habits/${habit.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        this.props.dispatch(alertsActions.setCurrentAlert('primary', 'Habit deleted.'));
        this.props.history.push('/');
        this.props.fetchHabits();
      });
  }

  render() {
    let { habit: { title, dates } } = this.props;



    return <div>
      <h1>
        {title}
      </h1>

      <div className="my-5 p-5">
        <button submit="button" className="btn btn-danger" onClick={this.delete}>
          Delete
        </button>

        <div className="card my-5">
          <div className="card-body">
            <Calendar completedDates={dates} />
          </div>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(connect()(Habit));
