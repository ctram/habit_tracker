import fetchPlus from '../../../helpers/fetch-plus';
import { SET_HABITS_INDEX } from '../constants/constants';

export function setHabitsIndex(habits)
{
  return { type: SET_HABITS_INDEX, habits }
};

export function fetchHabits(currentUser) {
  let status = null;

  if (!currentUser) {
    return Promise();
  }

  return fetchPlus(`http://localhost:3000/users/${currentUser.id}/habits`)
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 200) {
        return setHabitsIndex(res.habits);
      }

      throw(res.message);
    })
    .catch(e => console.error(e));
}

export function updateHabitCompletedForDate(habit, isCompleted, date, currentUser) {
  const { user_id, id } = habit;

  let status;

  return fetchPlus(`http://localhost:3000/users/${user_id}/habits/${id}/update_habit_completed_for_date`, {
    method: 'POST',
    body: JSON.stringify({ habit: { id, date, completed: isCompleted }})
  })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 200) {
        return fetchHabits(currentUser);
      }

      throw(res.message);
    })
    .catch(e => console.error(e));
}
