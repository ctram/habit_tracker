import { SET_CURRENT_ALERT } from '../constants/constants';

export default (state = { currentAlert: null }, action) => {
  let { alertType, message } = action;

  switch (action.type) {
    case SET_CURRENT_ALERT:
      return Object.assign({}, state, { currentAlert: { alertType, message }});
    default:
      return state;
  }
};
