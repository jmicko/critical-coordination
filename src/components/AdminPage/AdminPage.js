import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminPage/AdminPage.css'
import AdminUser from '../AdminUser/AdminUser'
import AdminCompany from '../AdminCompany/AdminCompany'
import AdminLocation from '../AdminLocation/AdminLocation'
import AdminTaskStatus from '../AdminTaskStatus/AdminTaskStatus'
import AddNewProject from '../AddNewProject/AddNewProject'

class AdminPage extends Component {

 componentDidMount() {
}

  state = {
    showUser: false,
    showCompany: false, 
    showLocation: false,
    showTaskStatus: false,
    showNewProject: false,
  }

  showUser = () => {
      this.setState ({
        showUser: !this.state.showUser,
        showCompany: false, 
        showLocation: false,
        showTaskStatus: false,
        showNewProject: false,
  })
  } 

  showCompany = () => {
    this.setState ({
      showUser: false,
      showCompany: !this.state.showCompany, 
      showLocation: false,
      showTaskStatus: false,
      showNewProject: false,
    })
  }

  showLocation = () => {
    this.setState ({
      showUser: false,
      showCompany: false, 
      showLocation: !this.state.showLocation,
      showTaskStatus: false,
      showNewProject: false,
    })
  }
  
  showTaskStatus = () => {
    this.setState ({
      showUser: false,
      showCompany: false, 
      showLocation: false,
      showTaskStatus: !this.state.showTaskStatus,
      showNewProject: false,
    })
  }

  showNewProject = () => {
    this.setState ({
      showUser: false,
      showCompany: false,
      showLocation: false,
      showTaskStatus: false,
      showNewProject: !this.state.showNewProject,
    })
  }

  render() {
    if(this.props.store.user.user_type === 'admin'){
      return (
        <center>
          <h1>Admin Page</h1>  
          {/* {JSON.stringify(this.props)} */}
          <button className="adminButtonClass" onClick={()=>this.showUser()}>Manage User</button>
          <button className="adminButtonClass" onClick={()=>this.showCompany()}>Manage Company</button>
          <button className="adminButtonClass" onClick={()=>this.showTaskStatus()}>Manage Task Status</button>
          <br/><br/>
          {this.state.showNewProject ?
          <AddNewProject /> : <p></p>}
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
