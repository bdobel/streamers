import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions/index';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // helper method to check current user is creator receiving list of streams as arg to iterate
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">
            Edit
          </button>
          <button className="ui button negative">
            Delete
          </button>
        </div>
      );
    }
  };
  
  renderList() {
    // take list of streams and render onto screen... mapping over
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  }

  // helper method to render create button... only show if currentUser is Creator {id: null unless signed in}
  renderCreate() {
    if (this.props.isSignedIn) {
      // react-router-dom link tag to nav between pages
      return (
        // add manual style to float button to right
        <div style={{ textAlign: 'right' }}>
          {/* Link requires a path or To prop */}
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  };
};

// get list of streams available as props into component - receives state as arg
const mapStateToProps = (state) => {
  // return object w/ streams property.  list of just streams inside arr and not have to worry about obj nature
  // object.values is built-in JS which takes obj as arg and turns it into an arr
  // userId required to confirm user is creator and thus, show may edit
  return { 
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

// turn object into array for component to ease iteration streams

export default connect(mapStateToProps, { fetchStreams} )(StreamList);
