import { SET_CURRENT_USER } from '../constants/constants';

export default (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
      break;
    default:
      return state;
  }
};
