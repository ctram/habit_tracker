import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/indexReducer';
import thunk from 'redux-thunk';

// Note: this API requires redux@>=3.1.0
// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );
//





const configureStore = (railsProps) => (
  createStore(appReducer, railsProps, applyMiddleware(thunk))
);

export default configureStore;
