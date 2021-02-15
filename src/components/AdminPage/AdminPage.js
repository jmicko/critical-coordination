import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminPage/AdminPage.css'
import AdminUser from '../AdminUser/AdminUser'
import AdminCompany from '../AdminCompany/AdminCompany'
import AdminLocation from '../AdminLocation/AdminLocation'
import AdminTaskStatus from '../AdminTaskStatus/AdminTaskStatus'

class AdminPage extends Component {

  componentDidMount() {
  }

  state = {
    active: "company"
  }

  render() {
    if (this.props.store.user.user_type === 'admin') {
      return (
        <div>
          {/* <center> */}
          <div className="container portfolio night rounded">
            <center>
              <div className="metal notched box">
                <h1 className="bigHeader"> Site Settings </h1>
              </div>

              {/* {JSON.stringify(this.props)} */}
              <div className="menu-hz">
                <button
                  className={`btn menu-hz-btn
                  ${this.state.active === "user" &&
                  "menu-active"}`}
                  onClick={() => this.setState({ active: "user" })}>
                  Manage User
                  </button>
                <button
                  className={`btn menu-hz-btn
                  ${this.state.active === "company" &&
                  "menu-active"}`}
                  onClick={() => this.setState({ active: "company" })}>
                  Manage Company
                  </button>
                <button
                  className={`btn menu-hz-btn
                  ${this.state.active === "task" &&
                  "menu-active"}`}
                  onClick={() => this.setState({ active: "task" })}>
                  Manage Task Status
                  </button>
              </div>
            </center>
            {/* <br /><br /> */}
            {/* <div className="container"> */}
            <div className="box">

              {this.state.active === "user" &&
                <AdminUser />}
              {this.state.active === "company" &&
                <>
                  <AdminCompany />
                  <AdminLocation />
                </>
                }
              {this.state.active === "task" &&
                <AdminTaskStatus />}
            </div >
          </div>
          {/* </center> */}
        </div>
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