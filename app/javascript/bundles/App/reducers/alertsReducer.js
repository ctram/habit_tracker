import * as constants from '../constants/constants';

export default (state = { currentAlert: null }, action) => {
  let { alertType, message } = action;

  switch (action.type) {
    case constants.SET_CURRENT_ALERT:
      return Object.assign({}, state, { currentAlert: { alertType, message }});
    case constants.CLEAR_CURRENT_ALERT:
      return Object.assign({}, state, { currentAlert: null });
    default:
      return state;
  }
};
