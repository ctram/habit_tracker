import users from './usersReducer';
import alerts from './alertsReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users, alerts });

export default appReducer;
