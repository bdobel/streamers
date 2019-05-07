import { combineReducers } from 'redux';
// react-form reducer requires vague name use as to make clear
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  // assign reducer to auth key
  auth: authReducer,
  // reducer's given key provided via redux-form library
  form: formReducer,
  streams: streamReducer
});