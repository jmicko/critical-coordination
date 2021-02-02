import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminPage/AdminPage.css'

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate year pull-down
    // this.props.dispatch({type: 'COMPANIES_XXXXXXXXX'});
    // this.props.dispatch({type: 'LOCATIONS_XXXXXXXXX'});
}

  state = {

  }


  render() {
    return (
      <div>
        <h1>Welcome to the admin page, {this.props.store.user.username}!</h1>
        
        <button>Manage User</button>
        <button>Manage Company</button>
        <button>Manage Location</button>


        <h3>Company List</h3>
        <h3>Location List</h3>
        <h3>User List</h3>

        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
