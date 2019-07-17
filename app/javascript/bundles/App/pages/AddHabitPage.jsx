import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import setCurrentAlert from '../actions/alertsActionCreators';

export default class AddHabitPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputTitle = React.createRef();

    this.submit = this.submit.bind(this);
  }

  submit() {
    const title = this.inputTitle.current.value
    const { currentUser } = this.props;

    if (!title) {
      return;
    }

    fetchPlus(`http://localhost:3000/users/${currentUser.id}/habits`, {
      method: 'POST',
      body: JSON.stringify({ habit: { title }})
    })
      .then(res => {
        if (res.status === 201) {
          this.props.history.push('/habits');
          this.props.dispatch(setCurrentAlert('success', 'Habit created.'));
        }

        return res.json();
      })
      .then(res => {
        throw(res.message);
      })
      .catch(e => console.error(e));
  }

  render() {
    return <div className="d-flex flex-column align-items-center">
      <h1>Add Habit</h1>
      <form className="w-50">
        <div className="form-group">
        <label htmlFor="inputTitle">Title</label>
        <input type="title" ref={this.inputTitle} className="form-control" id="inputTitle" placeholder="Enter title"/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.submit}>Add Habit</button>
      </form>
    </div>;
  }
}
