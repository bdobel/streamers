// axios instance to make requests to api
import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, EDIT_STREAM, DELETE_STREAM } from './types';


// pass in user id from google auth
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// action creator to create stream
// called with a list of all values added via form
export const createStream = (formValues) => {
  // async action creator - made possible with redux-thunk - called w/ dispatch function and getState where you will find userId from OAuth
  return async (dispatch, getState) => {
    // destructure userID from entire getState obj
    const { userId } = getState().auth;
    // make request to streams endpoint and localhost: 3001, put in all different formValues.. combine form values and user ID into a single obj: take key value pairs from formValues  and add to obj using ... and add in userID
    const response = await streams.post('/streams', { ...formValues, userId });

    // after response create dispatch when action type: CREATE_STREAM with payload: axios response obj has a ton of stuff about resposne, only need information in response AKA: .data
    dispatch({ type: CREATE_STREAM, payload: response.data })
    // do programmatic navigation to get user back to root route
    // push is how you navigate user... specified route is 'root'
    history.push('/');
  };
};

// action creator to fetch all streams
// arrow func that returns a thunk function
export const fetchStreams = () => async dispatch => {
  // RESTful conventions... GET request to /streams using axios 
  const response = await streams.get('/streams');

  // dispatch 
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// action creator to return single stream
export const fetchStream = (id) => {
  return async (dispatch) => {
    // get request to specified stream
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
};

// action creator to edit a stream
// requires ID and the update (via form)
export const editStream = (id, formValues) =>  {
  return async (dispatch) => {
    // put request (update) to ID w/ user's form values
    const response = await streams.put(`/streams/${id}`, formValues);
    
    dispatch({ type: EDIT_STREAM, payload: response.data });
  };
};

// action creator to delete a stream
export const deleteStream = (id) => {
  return async (dispatch) => {
    // no need for response... as a delete... it will be empty
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
  };
};
