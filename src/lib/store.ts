// redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blipReducer from './reducers/blipReducer';
import profileReducer from './reducers/profileReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  blips: blipReducer,
  profile: profileReducer,
  users: usersReducer,
});
const store = createStore(
  reducer, applyMiddleware(thunk),
);
export default store;
