import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminUser/AdminUser.css'


class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    // this.props.dispatch({type: 'USERS_XXXXXXXXX'});
   
}

  state = {
    stateBuffer: 0,
  }


  render() {
    return (
      <div>
        <h1>Welcome to the admin user page, {this.props.store.user.username}!</h1>
        
       


        <h3>Company List</h3>
     

        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
