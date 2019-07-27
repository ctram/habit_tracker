import fetchPlus from '../../../helpers/fetch-plus';
import { fetchHabits } from './habitsActionCreators';
import { startSpinner, endSpinner } from './spinnersActionCreators';
import { setCurrentAlert } from './alertsActionCreators';
import { translateResponseMessage } from '../../../helpers/response-helper';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
}

export function signIn(email, password) {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(({ json, res }) => {
      let message = translateResponseMessage(json.message);

      if (res.status === 200) {
        dispatch(setCurrentUser(json.user));
        dispatch(setCurrentAlert('success', message));
        return dispatch(fetchHabits(json.user));
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

export function signUp(email, password) {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/users`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(({ json, res }) => {
      let message = translateResponseMessage(json.message)

      if (res.status === 201) {
        return dispatch(setCurrentAlert('success', message));
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

export function signOut() {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'DELETE'
    })
      .then(({ json, res }) => {
        let message = translateResponseMessage(json.message);

        if (res.status === 200) {
          dispatch(setCurrentAlert('success', message));
          return dispatch(setCurrentUser(null));
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

export function authenticateUser() {
  return dispatch => {
    dispatch(startSpinner());

    return fetchPlus(`${SERVER_DOMAIN}/sessions`)
      .then(({ json, res }) => {
        const { user } = json;

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

    attributeType = `${attributeType[0].toUpperCase()}${attributeType.slice(1, attributeType.length)}`

    return fetchPlus(`${SERVER_DOMAIN}/users/${currentUser.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ user: attrs })
    })
      .then(({ json, res }) => {
        let errors = json.errors;
        let message = translateResponseMessage(json.message);

        if (res.status === 200) {
          dispatch(setCurrentUser(Object.assign(currentUser, json.user)));
          return dispatch(setCurrentAlert('success', `${attributeType} updated.`));
        }

        if (errors) {
          throw(errors);
        }

        throw(message);
      })
      .catch(e => {
        dispatch(setCurrentAlert('danger', e));
        console.error(e);
      })
      .finally(() => {
        dispatch(endSpinner());
      })
  };
}
