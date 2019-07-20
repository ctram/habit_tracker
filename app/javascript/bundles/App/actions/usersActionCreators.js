import fetchPlus from '../../../helpers/fetch-plus';

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

        return Promise.resolve();
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
