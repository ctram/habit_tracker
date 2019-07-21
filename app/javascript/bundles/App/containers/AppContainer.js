import { connect } from 'react-redux';
import AppPage from '../pages/AppPage';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    alert: state.alerts.currentAlert,
    habits: state.habits.habits,
    showSpinner: state.spinners.showSpinner
  }
};

export default connect(mapStateToProps)(AppPage);
