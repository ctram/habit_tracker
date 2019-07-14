import PropTypes from 'prop-types';
import React from 'react';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  render() {
    return 'Home page'
  }
}
