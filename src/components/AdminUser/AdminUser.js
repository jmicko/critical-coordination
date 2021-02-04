import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddUserForm from '../AddUserForm/AddUserForm'
import '../AdminUser/AdminUser.css'


class AdminUser extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_ALLUSERS'});
    this.props.dispatch({type: 'FETCH_ALLCOMPANY'});
  }

  state = {
    stateBuffer: 0,
    showAddUser: false,
  }

  addUser = () => {
    this.setState({
      showAddUser: !this.state.showAddUser
    })
    console.log('in add user');
  }

  render() {
    return (
      <div>
        <h3>Admin User Page</h3>

        {/* <h3>Category List</h3> */}
        {this.state.showAddUser ?
          <> <AddUserForm /> <button onClick={this.addUser}>Cancel</button></>
          : <button onClick={this.addUser}>Add User</button>}
              

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
                              <td><button className="adminButtonClass">Archive</button></td>
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
