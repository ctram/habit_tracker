import usersReducer from './usersReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({ usersReducer });

export default appReducer;
