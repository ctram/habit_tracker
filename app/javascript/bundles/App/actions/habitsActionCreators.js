import fetchPlus from '../../../helpers/fetch-plus';
import { SET_HABITS_INDEX } from '../constants/constants';
import { setCurrentAlert } from './alertsActionCreators';

export function setHabitsIndex(habits)
{
  return { type: SET_HABITS_INDEX, habits }
};

export function addHabit(title, currentUser) {
  let status;

  return dispatch => {
    if (!title) {
      return Promise.reject('There must be a title');
    }

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`, {
      method: 'POST',
      body: JSON.stringify({ habit: { title }})
    })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 201) {
        dispatch(setCurrentAlert('success', 'Habit created.'));
        return dispatch(fetchHabits(currentUser));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', 'There was an error creating your habit. Please try again.'));
      throw(e);
    });
  };
}

export function fetchHabits(currentUser) {
  let status = null;

  return dispatch => {
    if (!currentUser) {
      return Promise.resolve();
    }

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`)
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 200) {
        return dispatch(setHabitsIndex(res.habits));
      }

      throw(res.message);
    })
    .catch(e => {
      throw(e);
    });
  };

}

export function updateHabitCompletedForDate(habit, isCompleted, date, currentUser) {
  const { user_id, id } = habit;

  let status;

  return dispatch => {
    return fetchPlus(`${SERVER_DOMAIN}/users/${user_id}/habits/${id}/update_habit_completed_for_date`, {
      method: 'POST',
      body: JSON.stringify({ habit: { id, date, completed: isCompleted }})
    })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      if (status === 200) {
        return dispatch(fetchHabits(currentUser));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', 'There was an error logging your habit. Please refresh the page and try again.'));
      throw(e);
    });
  };
}

export function deleteHabit(currentUser, habit) {
  let status;

  return dispatch => {
    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits/${habit.id}`, {
      method: 'DELETE'
    })
      .then(res => {

        if (res.status !== 204) {
          dispatch(setCurrentAlert('danger', 'There was an error deleting the habit. Please try again.'));
          throw(res.message);
        }

        dispatch(setCurrentAlert('primary', 'Habit deleted.'));
        return dispatch(fetchHabits(currentUser));
      })
      .catch(e => {

        throw(e);
      });
  };



}
