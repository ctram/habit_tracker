import { SET_CURRENT_USER } from '../constants/constants';

export default (state = { currentUser: null }, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.user});
    default:
      return state;
  }
};
