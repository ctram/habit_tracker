import { START_SPINNER, END_SPINNER } from '../constants/constants';

export function startSpinner()
{
  return { type: START_SPINNER }
};

export function endSpinner()
{
  return { type: END_SPINNER }
};
