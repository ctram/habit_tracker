import { connect } from 'react-redux';
import AppPage from '../pages/AppPage';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps)(AppPage);
