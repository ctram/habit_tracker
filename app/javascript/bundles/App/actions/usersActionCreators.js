import fetchPlus from '../../../helpers/fetch-plus';
import { fetchHabits } from './habitsActionCreators';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { setCurrentAlert } from './alertsActionCreators';
import { translateResponseMessage, parseErrors } from '../../../helpers/response-helper';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
}

export function signIn(email, password) {
  return dispatch => {
    let status;
    let message;

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(res => {
      status = res.status;
      return res.json()
    })
    .then(res => {
      message = translateResponseMessage(res.message);


      if (status === 200) {
        dispatch(setCurrentUser(res.user));
        dispatch(setCurrentAlert('success', message));
        return dispatch(fetchHabits(res.user));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', message));
      throw(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function signUp(email, password) {
  return dispatch => {
    let status = null;
    let message;

    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(res => {
      status = res.status;

      return res.json();
    })
    .then(res => {
      message = translateResponseMessage(res.message)

      if (status === 201) {
        return dispatch(setCurrentAlert('success', message));
      }

      throw(res.message);
    })
    .catch(e => {
      dispatch(setCurrentAlert('danger', message));
      throw(e);
    })
    .finally(() => {
      dispatch(endSpinner());
    })
  };
}

export function signOut() {
  return dispatch => {
    dispatch(startSpinner());

    let status;
    let message;

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'DELETE'
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(res => {
        message = translateResponseMessage(res.message);

        if (status === 200) {
          dispatch(setCurrentAlert('success', message));
          return dispatch(setCurrentUser(null));
        }

        throw(res.message);
      })
      .catch(e => {
        dispatch(setCurrentAlert('danger', message));
        throw(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}

export function authenticateUser() {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }

        return {};
      })
      .then(res => {
        const { user } = res;

        if (user) {
          dispatch(setCurrentUser(user));
          return Promise.resolve(user);
        }
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}

export function updateUser(currentUser, attrs, attributeType) {
  return dispatch => {
    dispatch(startSpinner());

    let status;
    let message;
    let errors;

    attributeType = `${attributeType[0].toUpperCase()}${attributeType.slice(1, attributeType.length)}`

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ user: attrs })
    })
      .then(res => {
        status = res.status;

        return res.json();
      })
      .then(res => {
        errors = res.errors;
        message = translateResponseMessage(res.message);

        if (status === 200) {
          dispatch(setCurrentUser(Object.assign(currentUser, res.user)));
          return dispatch(setCurrentAlert('success', `${attributeType} updated.`));
        }

        if (errors) {
          dispatch(setCurrentAlert('danger', errors));
        } else {
          dispatch(setCurrentAlert('danger', message));
        }
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}
