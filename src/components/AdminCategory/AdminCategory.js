import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminLocation/AdminLocation.css'

class AdminCategory extends Component {
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
        <h1>Admin Category Page, {this.props.store.user.first_name}!</h1>
        
       
        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminCategory);