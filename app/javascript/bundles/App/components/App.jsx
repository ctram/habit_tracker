import PropTypes from 'prop-types';
import React from 'react';

export default class App extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        This is root of the app.
      </div>
    );
  }
}
