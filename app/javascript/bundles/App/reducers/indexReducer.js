import users from './usersReducer';
import alerts from './alertsReducer';
import habits from './habitsReducer';
import spinners from './spinnersReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users, alerts, habits, spinners });

export default appReducer;
