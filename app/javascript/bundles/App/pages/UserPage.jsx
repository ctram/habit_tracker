import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

class UserPage extends React.Component {
  render() {
    const { currentUser } = this.props;

    return <div className="py-5">
      <h1 className="my-3">Settings</h1>

      <div className="change-password py-5">
        <h2 className="my-1">Change Password</h2>

        <form>
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input id="current-password" type="password" className="form-control" placeholder="Current Password" ref={this.inputCurrentPassword} />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input id="new-password" type="password" className="form-control" placeholder="New Password" ref={this.inputNewPassword1} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input id="confirm-new-password" type="password" className="form-control" placeholder="Confirm New Password" ref={this.inputNewPassword2} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitPassword} >
            Change Password
          </button>
        </form>
      </div>

      <div className="change-username py-5">
        <h2 className="my-1">Change Email</h2>

        <div>
          <span className="font-weight-bold mr-1">Email:</span>
          {/*
            <span>{currentUser.email}</span>
            */}
        </div>

        <form>
          <div className="form-group">
            <label>New Email</label>
            <input className="form-control" placeholder="New Username" ref={this.inputNewEmail} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitEmail} >
            Change Email
          </button>
        </form>
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
