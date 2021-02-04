import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminPage/AdminPage.css'
import AdminUser from '../AdminUser/AdminUser'
import AdminCompany from '../AdminCompany/AdminCompany'
import AdminLocation from '../AdminLocation/AdminLocation'
import AdminTaskStatus from '../AdminTaskStatus/AdminTaskStatus'

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate year pull-down
    // this.props.dispatch({type: 'SET_ALLCOMPANY'});
    // this.props.dispatch({type: 'SET_ALLLOCATION'});
    // this.props.dispatch({type: 'SET_STATUSCATEGORY'});
}

  state = {
    showUser: false,
    showCompany: false, 
    showLocation: false,
    showTaskStatus: false,
  }

  showUser = () => {
      this.setState ({
        showUser: !this.state.showUser,
        showCompany: false, 
        showLocation: false,
        showTaskStatus: false,
  })
  } 

  showCompany = () => {
    this.setState ({
      showUser: false,
      showCompany: !this.state.showCompany, 
      showLocation: false,
      showTaskStatus: false,
    })
  }

  showLocation = () => {
    this.setState ({
      showUser: false,
      showCompany: false, 
      showLocation: !this.state.showLocation,
      showTaskStatus: false,
    })
  }
  
  showTaskStatus = () => {
    this.setState ({
      showUser: false,
      showCompany: false, 
      showLocation: false,
      showTaskStatus: !this.state.showTaskStatus,
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to the admin page, {this.props.store.user.first_name}!</h1>
        
        <button className="adminButtonClass" onClick={()=>this.showUser()}>Manage User</button>
        <button className="adminButtonClass" onClick={()=>this.showCompany()}>Manage Company</button>
        <button className="adminButtonClass" onClick={()=>this.showLocation()}>Manage Location</button>
        <button className="adminButtonClass" onClick={()=>this.showTaskStatus()}>Manage Task Status</button>


        {/* <h3>User List</h3> */}
        {this.state.showUser ?
        <AdminUser />: <p></p>}
        
        {/* <h3>Company List</h3> */}
        {this.state.showCompany ?
        <AdminCompany />: <p></p>}

        {/* <h3>Location List</h3> */}
        {this.state.showLocation ?
        <AdminLocation />: <p></p>}

        {/* <h3>Category List</h3> */}
        {this.state.showTaskStatus ?
        <AdminTaskStatus />: <p></p>}
        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
