import PropTypes from 'prop-types';
import React from 'react';

import { updateUser } from '../actions/usersActionCreators';
import { setCurrentAlert } from '../actions/alertsActionCreators';

import { connect } from 'react-redux';

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputNewEmail = React.createRef();
    this.inputCurrentPassword = React.createRef();
    this.inputNewPassword1 = React.createRef();
    this.inputNewPassword2 = React.createRef();

    this.submitPassword = this.submitPassword.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  submitPassword(e) {
    e.preventDefault();

    const { dispatch, currentUser } = this.props;
    const currentPassword = this.inputCurrentPassword.current.value;
    const newPassword1 = this.inputNewPassword1.current.value;
    const newPassword2 = this.inputNewPassword2.current.value;

    if (!currentPassword || !newPassword1 || !newPassword2) {
      return dispatch(setCurrentAlert('danger', 'Current password, a new password and confirmation password must not be empty.'));
    }

    if (newPassword1 !== newPassword2) {
      return dispatch(setCurrentAlert('danger', 'New password and confirmation password must match.'));
    }

    const attrs = {
      current_password: currentPassword,
      new_password: newPassword1
    }

    return dispatch(updateUser(currentUser, attrs, 'password'))
      .then(() => {
        this.inputCurrentPassword.current.value = '';
        this.inputNewPassword1.current.value = '';
        this.inputNewPassword2.current.value = '';
      })
      .catch(e => console.error(e));
  }

  submitEmail(e) {
    e.preventDefault();

    const { dispatch, currentUser } = this.props;
    const newEmail = this.inputNewEmail.current.value;

    if (!newEmail) {
      return dispatch(setCurrentAlert('danger', 'New email must not be empty.'));
    }

    const attrs = {
      email: newEmail
    };

    return dispatch(updateUser(currentUser, attrs, 'email'))
      .then(() => {
        this.inputNewEmail.current.value = '';
      })
      .catch(e => console.error(e));
  }

  render() {
    const { currentUser } = this.props;

    return <div className="d-flex flex-column align-items-center">
      <h1 className="my-3">Settings</h1>

      <div className="d-flex flex-column align-items-start">
        <div className="change-password my-3">
          <h2 className="my-3">Change Password</h2>
          <form onSubmit={this.submitPassword}>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input
                id="current-password"
                type="password"
                className="form-control"
                placeholder="Current Password"
                ref={this.inputCurrentPassword}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                className="form-control"
                placeholder="New Password"
                ref={this.inputNewPassword1}
                required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-new-password">Confirm New Password</label>
              <input
                id="confirm-new-password"
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                ref={this.inputNewPassword2}
                required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.submitPassword} >
              Change Password
            </button>
          </form>
        </div>

        <div className="change-username my-3">
          <h2 className="my-3">Change Email</h2>
          <div className="my-3">
            <span className="font-weight-bold mr-1">Current Email:</span>
            <span>{currentUser.email}</span>
          </div>
          <form onSubmit={this.submitEmail}>
            <div className="form-group">
              <label>New Email</label>
              <input
                className="form-control"
                placeholder="New email"
                ref={this.inputNewEmail}
                required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.submitEmail} >
              Change Email
            </button>
          </form>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  }
};

export default connect(mapStateToProps)(UserPage);
