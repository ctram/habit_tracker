import users from './usersReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ users });

export default appReducer;
