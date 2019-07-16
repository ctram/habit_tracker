import * as constants from '../constants/constants';

export function setCurrentAlert(alertType = 'primary', message)
{
  return { type: constants.SET_CURRENT_ALERT, alertType, message };
};

export function clearCurrentAlert() {
  return { type: constants.CLEAR_CURRENT_ALERT };
}
