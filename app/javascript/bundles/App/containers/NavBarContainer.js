import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import fetchPlus from '../../../helpers/fetch-plus';
import { setCurrentUser } from '../actions/usersActionCreators';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signOut: () => {
      return fetchPlus('http://localhost:3000/sessions', {
        method: 'DELETE'
      })
        .then(res => {
          ownProps.history.push('/sign-in');
          dispatch(setCurrentUser(null));
        })
        .catch(e => {debugger;console.error(e)});
    }
  };
};


export default connect(mapStateToProps)(NavBar);
