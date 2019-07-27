import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';
import * as usersActionCreators from '../actions/usersActionCreators';
import {setCurrentAlert } from '../actions/alertsActionCreators';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.submit = this.submit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  submit(e) {
    e.preventDefault();

    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (this.props.type === 'sign-up') {
      return this.signUp(email, password);
    }

    return this.signIn(email, password);
  }

  signIn(email, password) {
    const { dispatch } = this.props;

    dispatch(usersActionCreators.signIn(email, password))
      .then(() => {
        this.props.history.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  }

  signUp(email, password) {
    let status = null;
    const { dispatch } = this.props;

    dispatch(usersActionCreators.signUp(email, password))
      .then(res => {
        this.props.history.push('/sign-in');
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    const submitBtnText = this.props.type === 'sign-up' ? 'Sign Up' : 'Sign In'

    return (
        <form onSubmit={this.submit}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  ref={this.emailInput}
                  required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  ref={this.passwordInput}
                  required />
            </div>
            <button type="submit" className="btn btn-primary">
              {submitBtnText}
            </button>
        </form>
    );
  }
}

SignInForm.propTypes = {
  type: PropTypes.string
}

export default withRouter(SignInForm);
