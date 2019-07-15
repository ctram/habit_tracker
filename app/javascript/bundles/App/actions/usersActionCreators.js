/* eslint-disable import/prefer-default-export */

// import { HELLO_WORLD_NAME_UPDATE } from '../constants/helloWorldConstants';
//
// export const updateName = (text) => ({
//   type: HELLO_WORLD_NAME_UPDATE,
//   text,
// });
import { SET_CURRENT_USER } from '../constants/constants';

function setCurrentUser(user)
{
  return { type: SET_CURRENT_USER, user }
};

export { setCurrentUser };
