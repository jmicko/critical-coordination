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

 componentDidMount() {
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
    if(this.props.store.user.user_type === 'admin'){
      return (
        <center>
          <h1>Admin Page</h1>  
          {JSON.stringify(this.props)}
          <button className="adminButtonClass" onClick={()=>this.showUser()}>Manage User</button>
          <button className="adminButtonClass" onClick={()=>this.showCompany()}>Manage Company</button>
          <button className="adminButtonClass" onClick={()=>this.showTaskStatus()}>Manage Task Status</button>
          {/* <h3>User List</h3> */}
          {this.state.showUser ?
          <AdminUser />: <p></p>}
          {/* <h3>Company List</h3> */}
          {this.state.showCompany ?
          <AdminCompany />: <p></p>}
          {/* <h3>Location List</h3> */}
          {this.state.showCompany ?
          <AdminLocation />: <p></p>}
          {/* <h3>Category List</h3> */}
          {this.state.showTaskStatus ?
          <AdminTaskStatus />: <p></p>}
        </center>
      );
    } else {
      return (
        <center>
          <h1>Forbidden</h1>
        </center>
      )
    }
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);
