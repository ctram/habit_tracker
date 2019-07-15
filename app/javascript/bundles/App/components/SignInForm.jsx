import PropTypes from 'prop-types';
import React from 'react';
import fetchPlus from '../../../helpers/fetch-plus';
import { withRouter } from 'react-router';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.submit = this.submit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  submit() {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (this.props.type === 'sign-up') {
      return this.signUp(email, password);
    }

    return this.signIn(email, password);
  }

  signIn(email, password) {
    let status = null;

    fetchPlus('http://localhost:3000/sessions', {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
      .then(res => {
        status = res.status;
        return res.json()
      })
      .then(obj => {


        if (status === 200) {
          this.props.history.push('/home');
          this.props.setCurrentUser(obj.user);
          return;
        }

        throw(obj.message);
      })
      .catch(e => {
        console.error(e);
      })
  }

  signUp(email, password) {
    let status = null;

    fetchPlus('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
      .then(res => {
        status = res.status;
        return res.json()
      })
      .then(obj => {


        if (status === 201) {

          return this.props.history.push('/sign-in');
        }

        throw(obj.message);
      })
      .catch(e => {

        console.error(e);
      });
  }

  render() {
    const submitBtnText = this.props.type === 'sign-up' ? 'Sign Up' : 'Sign In'

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={this.emailInput} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref={this.passwordInput} />
            </div>
            {/*
                <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                */}
            <button type="submit" className="btn btn-primary" onClick={this.submit} >{submitBtnText}</button>
        </form>
    );
  }
}

export default withRouter(SignInForm);
