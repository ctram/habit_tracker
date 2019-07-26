import PropTypes from 'prop-types';
import React from 'react';

const ALERT_TYPES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

class AlertBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { alertType, message } = this.props;

    if (ALERT_TYPES.indexOf(alertType) === -1) {
      alertType = 'primary';
      console.warn(`Alert type "${alertType}" is not recognized. Defaulting to type "primary".`)
    }

    return (
      <div className="d-flex justify-content-center p-3">
        <div className={`alert alert-${alertType} text-center text-capitalize`} role="alert">
          {message}
        </div>
      </div>
    );
  }
}

AlertBar.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default AlertBar;
