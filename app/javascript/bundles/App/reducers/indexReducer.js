import users from './usersReducer';
import alerts from './alertsReducer';
import habits from './habitsReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users, alerts, habits });

export default appReducer;
