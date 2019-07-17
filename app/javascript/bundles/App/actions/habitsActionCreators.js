import { SET_HABITS_INDEX } from '../constants/constants';

function setHabitsIndex(habits)
{
  return { type: SET_HABITS_INDEX, habits }
};

export { setHabitsIndex };
