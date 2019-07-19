import { connect } from 'react-redux';
import SignInForm from '../components/SignInForm';

const mapStateToProps = (state) => ({ users: state.users });

export default connect(mapStateToProps)(SignInForm);
