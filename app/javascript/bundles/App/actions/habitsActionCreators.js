import fetchPlus from '../../../helpers/fetch-plus';
import { SET_HABITS_INDEX } from '../constants/constants';
import { setCurrentAlert } from './alertsActionCreators';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { translateResponseMessage, parseErrors } from '../../../helpers/response-helper';

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

    let status;
    let message;
    let errors;

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`, {
      method: 'POST',
      body: JSON.stringify({ habit: { title }})
    })
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(res => {
      message = translateResponseMessage(res.message);
      errors = res.errors;

      if (status === 201) {
        dispatch(setCurrentAlert('success', message));
        return dispatch(fetchHabits(currentUser));
      }

      throw(res.message);
    })
    .catch(e => {
      if (errors) {
        dispatch(setCurrentAlert('danger', errors));
      } else {
        dispatch(setCurrentAlert('danger', message));
      }
      throw(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function fetchHabits(currentUser) {
  let status;
  let message;

  return dispatch => {
    if (!currentUser) {
      return Promise.resolve();
    }

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits`)
    .then(res => {
      status = res.status;
      return res.json();
    })
    .then(res => {
      if (res.message) {
        message = translateResponseMessage(res.message);
      }

      if (status === 200) {
        return dispatch(setHabitsIndex(res.habits));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', message));
      console.error(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    });
  };
}

export function updateHabitCompletedForDate(habit, isCompleted, date, currentUser) {
  const { user_id, id } = habit;

  let status;
  let message;

  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${user_id}/habits/${id}/update_habit_completed_for_date`, {
      method: 'POST',
      body: JSON.stringify({ habit: { id, date, completed: isCompleted }})
    })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      message = translateResponseMessage(res.message);

      if (status !== 200) {
        return dispatch(setCurrentAlert('danger', message));
      }
    })
    .catch(e => {
      console.error(e);
    })
    .finally(() => {
      dispatch(endSpinner());
      dispatch(fetchHabits(currentUser));
    })
  };
}

export function deleteHabit(currentUser, habit) {
  let status;
  let message;

  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}/habits/${habit.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(res => {
        message = translateResponseMessage(res.message);

        if (status !== 200) {
          dispatch(setCurrentAlert('danger', message));
          throw(res.message);
        }

        dispatch(setCurrentAlert('primary', message));
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        dispatch(fetchHabits(currentUser));
        dispatch(endSpinner());
      })
  };
}
