import { START_SPINNER, END_SPINNER } from '../constants/constants';

export default (state = { habits: [] }, action) => {
  switch (action.type) {
    case START_SPINNER:
      return Object.assign({}, state, { showSpinner: true });
    case END_SPINNER:
      return Object.assign({}, state, { showSpinner: false });
    default:
      return state;
  }
};
