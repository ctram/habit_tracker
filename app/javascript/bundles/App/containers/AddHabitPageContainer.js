import { connect } from 'react-redux';
import AddHabitPage from '../pages/AddHabitPage';

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  }
};

export default connect(mapStateToProps)(AddHabitPage);
