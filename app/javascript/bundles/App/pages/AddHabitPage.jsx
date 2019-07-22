import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { setCurrentAlert } from '../actions/alertsActionCreators';
import { addHabit } from '../actions/habitsActionCreators';
import { connect } from 'react-redux';

class AddHabitPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputTitle = React.createRef();
    this.submit = this.submit.bind(this);
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

  render() {
    return <div className="d-flex flex-column align-items-center">
      <h1>Add Habit</h1>
      <form className="w-50" onSubmit={this.submit}>
        <div className="form-group">
        <label htmlFor="inputTitle">Title</label>
        <input type="title" ref={this.inputTitle} className="form-control" id="inputTitle" placeholder="Enter title"/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.submit}>Add Habit</button>
      </form>
    </div>;
  }
}

export default connect(null, null)(AddHabitPage);
