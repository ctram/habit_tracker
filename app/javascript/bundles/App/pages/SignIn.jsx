import PropTypes from 'prop-types';
import React from 'react';

import SignInForm from '../components/SignInForm'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class SignIn extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  render() {
    const headerTxt = this.props.type === 'sign-up' ? 'Sign Up' : 'Sign In'
    const type = this.props.type;

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-center">
              {headerTxt}
            </h1>
            <div>
                <SignInForm type={type} />
            </div>
        </div>
    );
  }
}
