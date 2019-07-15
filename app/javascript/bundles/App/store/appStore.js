import { createStore } from 'redux';
import appReducer from '../reducers/indexReducer';

const configureStore = (railsProps) => (
  createStore(appReducer, railsProps)
);

export default configureStore;
