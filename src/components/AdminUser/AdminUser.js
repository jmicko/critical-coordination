import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminUser/AdminUser.css'


class AdminUser extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_ALLUSERS'});
  }

  state = {
    stateBuffer: 0,
  }


  render() {
    return (
      <div>
        <h3>Admin <span style={{textDecoration: "underline"}}>User</span> Page, {this.props.store.user.first_name}!</h3>

              <button >Add User</button>

              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>email</th><th>First</th><th>Last</th><th>User Type</th><th>Company</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.allUsersReducer.map((lineItem, index) => {
                        return (
                          <tr key={index}>
                              <td>{lineItem.email}</td>
                              <td>{lineItem.first_name}</td>
                              <td>{lineItem.last_name}</td>
                              <td>{lineItem.user_type}</td>
                              <td>{lineItem.company_name}</td>
                              <td><button className="adminButtonClass">Modify</button></td>
                              <td><button className="adminButtonClass">Delete</button></td>
                          </tr>
                        );
                    })} 
                </tbody>
              </table>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminUser);
