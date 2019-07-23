import PropTypes from 'prop-types';
import React from 'react';
import HabitWeekCard from '../components/HabitWeekCard';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import fetchPlus from '../../../helpers/fetch-plus';
import { connect } from 'react-redux';
import DaysInWeek from '../components/DaysInWeek';
import priorDaysHelper from '../../../helpers/prior-days';
import { clearCurrentAlert } from '../actions/alertsActionCreators';

class HabitsIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
  }

  clearCurrentAlert() {
    this.props.dispatch(clearCurrentAlert());
  }

  render() {
    const { habits, currentUser } = this.props;

    let inner = 'No habits. Go ahead and create one.';

    let priorDays = priorDaysHelper(6, new Date());

    if (habits.length > 0) {
      inner = habits.map((habit, idx) => {
        return <div className="m-2 my-5" key={idx}>
          <HabitWeekCard
            habit={habit}
            priorDays={priorDays}
            fetchHabits={this.props.fetchHabits}
            currentUser={currentUser} />
        </div>;
      });
    }

    return (
        <div className="d-flex flex-column align-items-center">
          <Link
            className="btn btn-primary"
            to="/habits/new"
            onClick={this.clearCurrentAlert}>
            Add Habit
          </Link>

          {
            false && habits.length > 0
              && <div className="mt-5 px-1 w-100">
                <DaysInWeek priorDays={priorDays} />
              </div>
          }

          <div className="my-5 text-center habits-index-page w-100">
            {inner}
          </div>
        </div>
    );
  }
}

HabitsIndexPage.defaultProps = {
  habits: []
};

const mapStateToProps = (state) => {
  return {
    habits: state.habits.habits, // yes, the first habit key is the namespace; the nested habits key is the actually array of habits.,
    currentUser: state.users.currentUser
  };
};

export default connect(mapStateToProps)(HabitsIndexPage);
