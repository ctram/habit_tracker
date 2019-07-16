import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import * as usersActions from '../actions/usersActionCreators';
import * as alertsActions from '../actions/alertsActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ users: state.users });

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => {
      dispatch(usersActions.setCurrentUser(user));
    },
    alertSignInError: (alertType, message) => {
      dispatch(alertsActions.setCurrentAlert(alertType, message));
    }
  };
}

export default connect(mapStateToProps,   mapDispatchToProps)(SignInForm);
