import PropTypes from 'prop-types';
import React from 'react';
import { parseErrors } from '../../../helpers/response-helper';

const ALERT_TYPES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

class AlertBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { alertType, message } = this.props;

    if (ALERT_TYPES.indexOf(alertType) === -1) {
      alertType = 'primary';
      console.warn(`Alert type "${alertType}" is not recognized. Defaulting to type "primary".`)
    }

    if (Object.getPrototypeOf(message) === Object.prototype) {
      message = parseErrors(message).reduce((acc, el) => {
        acc.push(<li key={el}>
          {el}
        </li>);
        return acc;
      }, []);

      message = <ul>
        {message}
      </ul>;
    }

    return (
      <div className="d-flex justify-content-center px-3">
        <div className={`alert alert-${alertType} text-center text-capitalize`} role="alert">
          {message}
        </div>
      </div>
    );
  }
}

AlertBar.propTypes = {
  alertType: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object
  ]).isRequired
};

export default AlertBar;
