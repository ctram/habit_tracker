import { SET_HABITS_INDEX } from '../constants/constants';

export default (state = { habits: [] }, action) => {
  switch (action.type) {
    case SET_HABITS_INDEX:
      return Object.assign({}, state, { habits: action.habits});
    default:
      return state;
  }
};
