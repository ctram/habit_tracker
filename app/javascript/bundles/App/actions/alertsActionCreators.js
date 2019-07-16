import { SET_CURRENT_ALERT } from '../constants/constants';

function setCurrentAlert(alertType = 'primary', message)
{
  return { type: SET_CURRENT_ALERT, alertType, message }
};

export { setCurrentAlert };
