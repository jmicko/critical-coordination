import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';

import '../AdminLocation/AdminLocation.css'

class AdminLocation extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ALLLOCATION' });
  }

  state = {
    updatePopupFlag: false,
    deletePopupFlag: false,
    newLocation: {
      company: '',
      address: '',
      location_name: '',
    },
    editRecord: {
      id: 0,
      address: '',
      location_name: '',
      company_fk: 0,
      archived: false,
    },
    showAddLocation: false
  };

  handleChangeNewLocation = (event, type) => {
    this.setState({
      newLocation: {
        ...this.state.newLocation,
        [type]: event.target.value
      }
    })
  }

  addLocation = (event) => {
    event.preventDefault();
    let location = this.state.newLocation;
    if (location.company !== '' && location.address !== '' && location.location_name !== '') {
      console.log('in addLocation');
      this.props.dispatch({ type: 'ADMIN_ADD_LOCATION', payload: location })
    } else {
      alert('Please ensure all fields are filled before submitting')
    }
    this.setState({
      showAddLocation: false,
      newLocation: {
        company: '',
        address: '',
        location_name: '',
      }
    })
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
    console.log(`updated record payload:`, this.state.editRecord);
    this.props.dispatch({ type: 'UPDATE_LOCATION_VIAADMIN', payload: this.state.editRecord });
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        address: '',
        location_name: '',
        company_fk: 0,
        archived: false,
      }
    })

  }

  openUpdatePopup = (passedRecord) => {
    this.setState({
      updatePopupFlag: false,
      updateDeleteFlag: false,
    })
    console.log(`payload on openUpdatePopup`, passedRecord);
    this.setState({
      updatePopupFlag: !this.state.updatePopupFlag,
      editRecord: {
        id: passedRecord.location_id,
        address: passedRecord.address,
        location_name: passedRecord.location_name,
        company_fk: passedRecord.company_fk,
        archived: false,
      }
    })
  }

  openDeletePopup = (passedRecord) => {
    this.setState({
      updatePopupFlag: false,
      updateDeleteFlag: false,
    })
    console.log(`payload on openDeletePopup`, passedRecord);
    this.setState({
      deletePopupFlag: !this.state.deletePopupFlag,
      editRecord: {
        id: passedRecord.location_id,
        address: passedRecord.address,
        location_name: passedRecord.location_name,
        company_fk: passedRecord.company_fk,
        archived: true,
      }
    })
  }

  cancelUpdate = () => {
    console.log(`cancel and close`);
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        address: '',
        location_name: '',
        company_fk: 0,
        archived: false,
      }
    })
  }



  showAddLocation = () => {
    this.setState({
      showAddLocation: !this.state.showAddLocation
    })
  }


  render() {
    return (
      <div>
        <div className="highlighter">
          <h2>Company Management</h2>
        </div>
        {this.state.showAddLocation ?
          <div className="box">
            <center>
              <button className="btn" onClick={this.showAddLocation}>Close</button>
            </center>
            <form className="formPanel metal">
              <div className="highlighter">
                <h2>Add New Location</h2>
              </div>
              <label>Select Company to add a location to: </label>
              <select onChange={(event) => this.handleChangeNewLocation(event, 'company')}>
                {this.props.store.admin.allCompanyReducer.map((company) => <option key={company.id} value={company.id}>{company.company_name}</option>)}
              </select>
              <br />
              <label>New Location Address:</label>
              <input required onChange={(event) => this.handleChangeNewLocation(event, 'address')} value={this.state.newLocation.address}></input>
              <br />
              <label>New Location Nickname: </label>
              <input required onChange={(event) => this.handleChangeNewLocation(event, 'location_name')} value={this.state.newLocation.location_name}></input>
              <button className="btn" type="submit" onClick={(event) => this.addLocation(event)}>Add Location</button>
            </form>
          </div>
          :
          <div className="box">
            <button className="btn" onClick={this.showAddLocation}>Add Location</button>
          </div>
        }

        <table className="tableClass">
          <thead className="headerClass">
            <tr><th>Company</th><th>Name</th><th>Address</th><th>&nbsp;</th><th>&nbsp;</th></tr>
          </thead>
          <tbody className="bodyClass">
            {this.props.store.admin.allLocationReducer.map((lineItem, index) => {
              return (
                <tr key={index}>
                  <td>{lineItem.company_name}</td>
                  <td>{lineItem.location_name}</td>
                  <td>{lineItem.address}</td>
                  <td>
                    <button onClick={() => this.openUpdatePopup(lineItem)}>Edit</button>
                    <Popup position="center" open={this.state.updatePopupFlag} closeOnDocumentClick>
                      <div className="editPanel" >
                        <table>
                          <thead>
                            <tr>
                              <th>Location Name</th>
                              <th>Address</th>
                              <th>Company</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><input placeholder={lineItem.location_name} value={this.state.editRecord.location_name} onChange={this.handleChange('location_name')} /> </td>
                              <td><input placeholder={lineItem.address} value={this.state.editRecord.address} onChange={this.handleChange('address')} /> </td>
                              <td>
                                <select placeholder={lineItem.company_name} value={this.state.editRecord.company_fk} onChange={this.handleChange('company_fk')}>
                                  {this.props.store.admin.allCompanyReducer.map((company) => {
                                    return (
                                      <option key={company.id} value={company.id}>{company.company_name}</option>)
                                  })}
                                </select>
                              </td>
                            </tr>
                          </tbody>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
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
                    <button onClick={() => this.openDeletePopup(lineItem)}>Delete</button>
                    <Popup position="center" open={this.state.deletePopupFlag}>
                      <div className="editPanel" >
                        <h3>Are you sure you would like to delete this record?</h3>
                        <p>Deleted locations will no longer be avialable to select for new records, </p>
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
export default connect(mapStoreToProps)(AdminLocation);
