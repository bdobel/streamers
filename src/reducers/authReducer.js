// reducer called one time on init... no user imput... requires default state assigned
import { SIGN_IN, SIGN_OUT } from '../actions/types';

//initalize state prop
const INTIAL_STATE = {
  isSignedIn: null,
  userId: null
};

// default state with action property
export default(state = INTIAL_STATE, action) => {
  // switch running over action type
  switch(action.type){
    case SIGN_IN:
      // modify property in state using spread syntax (...) stuffs conntents into new
      // New obj takes all values: out of state arg and put in new obj and update isSignedIn, userId of signed in user
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
