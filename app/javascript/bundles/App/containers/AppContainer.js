import { connect } from 'react-redux';
import AppPage from '../pages/AppPage';
import fetchPlus from '../../../helpers/fetch-plus';
import { setCurrentUser } from '../actions/usersActionCreators';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    alert: state.alerts.currentAlert
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateUser: () => {
      return fetchPlus('http://localhost:3000/sessions')
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }

          return {};
        })
        .then(res => {
          const { user } = res;

          if (user) {
            return dispatch(setCurrentUser(user));
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
