import fetchPlus from '../../../helpers/fetch-plus';
import { fetchHabits } from './habitsActionCreators';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
};

export function signIn(email, password) {
  return dispatch => {
    let status = null;

    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .then(res => {
      status = res.status;
      return res.json()
    })
    .then(obj => {
      if (status === 200) {
        dispatch(setCurrentUser(obj.user));
        return dispatch(fetchHabits(obj.user));
      }

      throw(obj.message);
    })
    .catch(e => {
      throw(e);
    });
  };
}

export function signUp(email, password) {
  return dispatch => {
    let status = null;

    return fetchPlus(`${SERVER_DOMAIN}/users`, {
      method: 'POST',
      body: JSON.stringify({ user: { email, password } })
    })
    .catch(e => {
      throw(e)
    });
  };
}

export function signOut() {
  return dispatch => {
    return fetchPlus(`${SERVER_DOMAIN}/sessions`, {
      method: 'DELETE'
    })
      .then(() => {
        dispatch(setCurrentUser(null));
      })
      .catch(e => {
        throw(e)
      });
  };
}

export function authenticateUser() {
  return dispatch => {
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

        throw('Not authenticated.')
      })
      .catch(e => {
        throw(e);
      });
  };
}
