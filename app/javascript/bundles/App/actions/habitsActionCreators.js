import fetchPlus from '../../../helpers/fetch-plus';
import { SET_HABITS_INDEX } from '../constants/constants';
import { setCurrentAlert } from './alertsActionCreators';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { translateResponseMessage } from '../../../helpers/response-helper';

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

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`, {
      method: 'POST',
      body: JSON.stringify({ habit: { title }})
    })
    .then(({ json, res }) => {
      let message = translateResponseMessage(json.message);
      let errors = json.errors;

      if (res.status === 201) {
        dispatch(setCurrentAlert('success', message));
        return dispatch(fetchHabits(currentUser));
      }

      if (errors) {
        throw(errors);
      }

      throw(message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', e));
      throw(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function fetchHabits(currentUser) {
  return dispatch => {
    if (!currentUser) {
      return Promise.resolve();
    }

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`)
    .then(({ json, res }) => {
      if (res.status === 200) {
        return dispatch(setHabitsIndex(json.habits));
      }

      throw(translateResponseMessage(json.message));
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', e));
      console.error(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    });
  };
}

export function updateHabitCompletedForDate(habit, isCompleted, date, currentUser) {
  const { user_id, id } = habit;

  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${user_id}/habits/${id}/update_habit_completed_for_date`, {
      method: 'POST',
      body: JSON.stringify({ habit: { id, date, completed: isCompleted }})
    })
    .then(({ json, res }) => {
      let message = translateResponseMessage(json.message);

      if (res.status !== 200) {
        throw(message);
      }
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', e));
      console.error(e);
    })
    .finally(() => {
      dispatch(endSpinner());
      dispatch(fetchHabits(currentUser));
    })
  };
}

export function deleteHabit(currentUser, habit) {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits/${habit.id}`, {
      method: 'DELETE'
    })
      .then(({ json, res }) => {
        let message = translateResponseMessage(json.message);

        if (res.status === 200) {
          return dispatch(setCurrentAlert('primary', message));
        }

        throw(message);
      })
      .catch(e => {
        dispatch(setCurrentAlert('danger', e));
        console.error(e);
      })
      .finally(() => {
        dispatch(fetchHabits(currentUser));
        dispatch(endSpinner());
      })
  };
}
