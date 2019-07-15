import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';
import * as actions from '../actions/usersActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ users: state.users });

const mapDispatchToProps = dispatch => {
  setCurrentUser: user => {
    dispatch(setCurrentUser(user));
  }
}
// Don't forget to actually use connect!
// Note that we don't export App, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, actions)(SignInForm);
