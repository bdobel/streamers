import _ from 'lodash';

import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // mapKeys, from lodash library, takes arr and makes an obj
    case FETCH_STREAMS:
      // create new obj; with list of streams from api... make obj using mapKeys, where key: id becomes the key of the individual streams and stuff in using ...
      return { ...state, ..._.mapKeys(action.payload, 'id' )};

    // thee examples return single record each
    case FETCH_STREAM:
      // redux requires changes be made to state obj to recognize.  all key value pairs into new obj{state}, add new key equal to id received, set value equal to payload.
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      // take from action payload newly created stream id. 
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      // from lodash library, omit, doesn't delete but rather creates new obj with all properties except provided.  pass in entire state and the id to remove.
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
