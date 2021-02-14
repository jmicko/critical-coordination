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
    active: "user"
  }

  render() {
    if (this.props.store.user.user_type === 'admin') {
      return (
        <center>
          <h1 className="menu-hz-header">Admin</h1>
          {/* {JSON.stringify(this.props)} */}
          <div className="menu-hz">
            <button className="menu-hz-btn" onClick={() => this.setState({ active: "user" })}>Manage User</button>
            <button className="menu-hz-btn" onClick={() => this.setState({ active: "company" })}>Manage Company</button>
            <button className="menu-hz-btn" onClick={() => this.setState({ active: "task" })}>Manage Task Status</button>
          </div>
          <br /><br />
          {this.state.active === "user" &&
            <AdminUser />}
          {this.state.active === "company" &&
            <>
              <AdminCompany />
              <AdminLocation />
            </>}
          {this.state.active === "task" &&
            <AdminTaskStatus />}
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