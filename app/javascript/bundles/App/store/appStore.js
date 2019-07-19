import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

const configureStore = (railsProps) => (
  createStore(appReducer, railsProps, applyMiddleware(thunk))
);

export default configureStore;
