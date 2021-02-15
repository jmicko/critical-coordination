import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <center>
        {/* <p>{JSON.stringify(this.props.store.user)}</p> */}
        <div className="formPanel night">
          <h1 id="welcome">Welcome, {this.props.store.user.first_name}!</h1>
          <p><strong className="data-label">Your ID is:</strong> {this.props.store.user.id}</p>
          <p><strong className="data-label">Your full name is:</strong> {this.props.store.user.first_name} {this.props.store.user.last_name}</p>
          <p><strong className="data-label">Your email is:</strong> {this.props.store.user.email}</p>
          <p><strong className="data-label">Your authorization level is:</strong> {this.props.store.user.user_type}</p>
          <p>
            Something doesn't look right?
            <br /> Email Tom <a href="mailto: tom@criticalcoordination.com">tom@criticalcoordination.com</a>
          </p>
          <LogOutButton className="log-in btn" />
        </div>
      </center>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
