import fetchPlus from '../../../helpers/fetch-plus';

import { SET_CURRENT_USER } from '../constants/constants';

export function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
};

export function signIn(email, password) {

  return function (dispatch) {
    let status = null;

    return fetchPlus('http://localhost:3000/sessions', {
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
      console.error(e);
      return Promise.reject(e)
    });
  };

}
