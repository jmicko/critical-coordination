import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddUserForm from '../AddUserForm/AddUserForm'
import Popup from 'reactjs-popup';

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
    editRecord:{
      id: 0,
      email: '',
      first_name: '',
      last_name: '',
      company_fk: 0,
      user_type: '',
      archived: false,
    }
  }

  handleChange = name => event => {
    this.setState({ 
      editRecord: {
        ...this.state.editRecord,
        [name]: event.target.value 
      }
    });    
  }

  updateRecord = () => { 
    console.log (`updated record payload:`, this.state.editRecord);
    this.props.dispatch({ type: 'UPDATE_USER_VIAADMIN', payload: this.state.editRecord});  
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        email: '',
        first_name: '',
        last_name: '',
        company_fk: 0,
        user_type: '',
        archived: false,
      }
    })
    this.props.dispatch({type: 'FETCH_ALLUSERS'});
    this.props.dispatch({type: 'FETCH_ALLCOMPANY'});
  }

  openUpdatePopup = (passedRecord) => {
    this.setState({
      updatePopupFlag: false,
      updateDeleteFlag: false,
    })
    console.log (`payload on openUpdatePopup`, passedRecord);
    this.setState({
      updatePopupFlag: !this.state.updatePopupFlag,
      editRecord: {
        id: passedRecord.id,
        email: passedRecord.email,
        first_name: passedRecord.first_name,
        last_name: passedRecord.last_name,
        company_fk: passedRecord.company_fk,
        user_type: passedRecord.user_type,
        archived: false,
      }
    })
  }
  
  openDeletePopup = (passedRecord) => {
    this.setState({
      updatePopupFlag: false,
      updateDeleteFlag: false,
    })
    console.log (`payload on openDeletePopup`, passedRecord);
    this.setState({
      deletePopupFlag: !this.state.deletePopupFlag,
      editRecord: {
        id: passedRecord.id,
        email: passedRecord.email,
        first_name: passedRecord.first_name,
        last_name: passedRecord.last_name,
        company_fk: passedRecord.company_fk,
        user_type: passedRecord.user_type,
        archived: true,
      }
    })
  }
  
  cancelUpdate = () => { 
    console.log (`cancel and close`);
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        status_type: '',
        archived: false
      }
    })
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
          <> <AddUserForm /> <button onClick={this.addUser}>Close</button></>
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
                              <td>
                              <button onClick={()=>this.openUpdatePopup(lineItem)}>Edit</button>
                                <Popup position="center" open={this.state.updatePopupFlag} closeOnDocumentClick>
                                    <div className="editPanel" >
                                      <table>
                                        <thead>
                                          <tr>
                                            <th>email</th>
                                            <th>First</th>
                                            <th>Last</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td><input placeholder={lineItem.email} value={this.state.editRecord.email} onChange={this.handleChange('email')}/> </td>
                                            <td><input placeholder={lineItem.first_name} value={this.state.editRecord.first_name} onChange={this.handleChange('first_name')}/> </td>
                                            <td><input placeholder={lineItem.last_name} value={this.state.editRecord.last_name} onChange={this.handleChange('last_name')}/> </td>
                                          </tr>
                                        </tbody>
                                        <thead>
                                          <tr>
                                            <th>User Type</th>
                                            <th>Company</th>
                                            <th>Buttons</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <select placeholder={lineItem.user_type} value={this.state.editRecord.user_type} onChange={this.handleChange('user_type')}>
                                                <option value="admin">admin</option>
                                                <option value="client">client</option>
                                                <option value="contractor">contractor</option>
                                              </select>
                                            </td>
                                            <td>
                                              <select placeholder={lineItem.company_name} value={this.state.editRecord.company_name} onChange={this.handleChange('company_name')}>
                                              {this.props.store.admin.allCompanyReducer.map( (company) => {
                                                return (
                                                    <option key={company.id} value={company.id}>{company.company_name}</option>)})}
                                              </select>
                                            </td>
                                            <td>
                                                <button onClick={this.updateRecord}>Save</button> 
                                                <button onClick={this.cancelUpdate}>Cancel</button> 
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      
                                    </div>
                                </Popup>
                              </td>
                              <td>
                                <button onClick={()=>this.openDeletePopup(lineItem)}>Delete</button>
                                <Popup position="center" open={this.state.deletePopupFlag}>
                                      <div className="editPanel" >
                                          <h3>Are you sure you would like to delete this record?</h3> 
                                          <p>Deleted statuses will no longer be avialable to select for new records, </p> 
                                          <p>but existing records with this status will maintain as is.</p> 
                                          <button onClick={this.updateRecord}>Yes Delete</button> 
                                          <button onClick={this.cancelUpdate}>Cancel</button> 
                                      </div>
                                 </Popup>
                                 </td>
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
