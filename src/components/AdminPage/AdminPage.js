import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminPage/AdminPage.css'
import AdminUser from '../AdminUser/AdminUser'
import AdminCompany from '../AdminCompany/AdminCompany'
import AdminLocation from '../AdminLocation/AdminLocation'

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate year pull-down
    // this.props.dispatch({type: 'COMPANIES_XXXXXXXXX'});
    // this.props.dispatch({type: 'LOCATIONS_XXXXXXXXX'});
}

  state = {
    showUser: false,
    showCompany: false, 
    showLocation: false,
  }

  showUser = () => {
      this.setState ({
        showUser: !this.state.showUser,
        showCompany: false, 
        showLocation: false,
      })
  }

  showCompany = () => {
    this.setState ({
      showUser: false,
      showCompany: !this.state.showCompany, 
      showLocation: false,
    })
  }

  showLocation = () => {
    this.setState ({
      showUser: false,
      showCompany: false, 
      showLocation: !this.state.showLocation,
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to the admin page, {this.props.store.user.username}!</h1>
        
        <button onClick={()=>this.showUser()}>Manage User</button>
        <button onClick={()=>this.showCompany()}>Manage Company</button>
        <button onClick={()=>this.showLocation()}>Manage Location</button>


        <h3>User List</h3>
        {this.state.showUser ?
        <AdminUser />: <p></p>}
        
        <h3>Company List</h3>
        {this.state.showCompany ?
        <AdminCompany />: <p></p>}

        <h3>Location List</h3>
        {this.state.showLocation ?
        <AdminLocation />: <p></p>}

        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
