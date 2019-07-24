import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { setCurrentAlert } from '../actions/alertsActionCreators';
import { addHabit } from '../actions/habitsActionCreators';
import { connect } from 'react-redux';
import { clearCurrentAlert } from '../actions/alertsActionCreators';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AddHabitPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputTitle = React.createRef();
    this.submit = this.submit.bind(this);
    this.clearCurrentAlert = this.clearCurrentAlert.bind(this);
  }

  submit(e) {
    e.preventDefault();

    const title = this.inputTitle.current.value
    const { currentUser, history, dispatch } = this.props;

    dispatch(addHabit(title, currentUser))
      .then(() => {
        history.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  }

  clearCurrentAlert() {
    this.props.dispatch(clearCurrentAlert());
  }

  render() {
    return <div className="d-flex flex-column align-items-center px-5">
      <div className="w-100">
        <div className="d-flex justify-content-start mb-3">
          <Link className="btn btn-info" to="/" onClick={this.clearCurrentAlert}>
            Back
          </Link>
        </div>
        <div className="form-container my-5">
          <h1>Add Habit</h1>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label htmlFor="inputTitle">Title</label>
              <input type="title" ref={this.inputTitle} className="form-control" id="inputTitle" placeholder="Enter habit title"/>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.submit}>
              Add Habit
            </button>
          </form>
        </div>
      </div>
    </div>;
  }
}

export default connect()(AddHabitPage);
