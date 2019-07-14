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
    return (
        <div className="d-flex justify-content-center">
            <div className="mw-25">
                <SignInForm />
            </div>
        </div>
    );
  }
}
