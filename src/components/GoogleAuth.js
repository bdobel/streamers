// refactor - see ..._v1
// this removes component level state
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';

// initialize library... this does not do the authorization
// why class?  Need access to state props to check, confirm, update state causing rerender
class GoogleAuth extends React.Component {

  // initialize library/ load client portion 1 time when component is first rendered
  componentDidMount() {
    //  var gapi available on windows scope in browser. request takes time, requiring callback for when process is complete
    // callback fires once client:auth2 returns 
    window.gapi.load('client:auth2', () => {
      // async network request... init client w/ ID
      window.gapi.client.init({
        clientId: '579960989278-l9snmfdh36k2m4i3cg1ej3tfa19ll373.apps.googleusercontent.com',
        // define scopes to load on client init (what acces do we want from user's profile)
        scope: 'email'
      // load function only allows notice of completion through callback func.  The init is different in that it returns a promise which gives a tap once the init is completed 
      // the arrow function will fire after the init completes... then do 'blah'
      // after iniitalizing liberary finishes...
      }).then(() => {
        // assign auth instance
        // get ref of auth.  The ref uses getAuthInstance to access attributes from profile e.g. user is signedIn
        this.auth = window.gapi.auth2.getAuthInstance();
        // set auth state in redux store
        // dispatch initial action when finished initializing library to indicate user signedIn
        // call onAuthChange, pass in isSignedIn, and function calls appropriate ActionCreator
        this.onAuthChange(this.auth.isSignedIn.get());
        // event listener w/ callback method - wired to google api library isomg 'isSignedIn.listen'
        // wait around listening for auth to change.
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // helper methods

  // as arrow function so context is bound to the component
  // called when login status changes - according to gapi
  // auth.isSignedIn.get() returns boolean.  receive as an arg w/ (isSignedIn)
  onAuthChange = (isSignedIn) => {
    // update state with current status in auth ref -- component controlled state -- how down without redux.. which moves state from components and into state repository  
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    // redux method
    if(isSignedIn) {
      // pass in signed in user id.  google assigned id from when account was created.
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  // func called when sign in button clicked
  onSignInClick = () => {
    this.auth.signIn();
  };

  // func called when sign out button clicked
  onSignOutClick = () => {
    this.auth.signOut();
  };

  // check state of user
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        // no parentheses because it's not immediately firing.
        <button onClick={ this.onSignOutClick } className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );  
    } else {
      return (
        <button onClick={ this.onSignInClick }className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{ this.renderAuthButton() }</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

// wire data store, action creators to authentication.
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

// once user signs in or out call correct action creator.