import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminCompany/AdminCompany.css'

class AdminCompany extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Gets data to populate lists/tables
    this.props.dispatch({ type: 'FETCH_ALLCOMPANY' });
  }

  state = {
    updatePopupFlag: false,
    deletePopupFlag: false,
    newCompany: {
      company: '',
      },
    editRecord:{
        id: 0,
        company_name: '',
        archived: false,
      }
  };

  handleChangeNewCompany = (event, type) => {
    this.setState({
      newCompany: {
        ...this.state.newCompany,
        [type]: event.target.value
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
    console.log (`updated record payload:`, this.state.editRecord);
    this.props.dispatch({ type: 'UPDATE_COMPANY_VIAADMIN', payload: this.state.editRecord});  
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        company_name: '',
        archived: false
      }
    })
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
        company_name: passedRecord.company_name,
        archived: false
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
        company_name: passedRecord.company_name,
        archived: true
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
        company_name: '',
        archived: false
      }
    })
  }


  addCompany = (event) => {
    event.preventDefault();
    let company = this.state.newCompany;
    if (company.company !== '') {
      console.log('in addCompany');
      this.props.dispatch({ type: 'ADMIN_ADD_COMPANY', payload: company })
    } else {
      alert('Please ensure all fields are filled before submitting')
    }
    this.setState({
      showAddUser: false,
      newCompany: {
        company: '',
      }
    })
  }

  showAddCompany = () => {
    this.setState({
      showAddCompany: !this.state.showAddCompany
    })
    console.log('in addCompany');
  }

  render() {
    return (
      <div>
        <h3>Admin Company Page</h3>
        {this.state.showAddCompany ?
          <> <h4>Add New User</h4>
            <form>
              <label>New Company Name: </label>
              <input required onChange={(event) => this.handleChangeNewCompany(event, 'company')} value={this.state.newCompany.company}></input>
              <button className="button" type="submit" onClick={(event) => this.addCompany(event)}>Add Company</button>
            </form><button onClick={this.showAddCompany}>Close</button></>
          : <button onClick={this.showAddCompany}>Add Company</button>}
        <table className="tableClass">
          <thead className="headerClass">
            <tr><th>Company Name</th><th>&nbsp;</th><th>&nbsp;</th></tr>
          </thead>
          <tbody className="bodyClass">
            {this.props.store.admin.allCompanyReducer.map((lineItem, index) => {
              JSON.stringify(lineItem)
              return (
                <tr key={index}>
                  <td>{lineItem.company_name}</td>
                  <td>
                      <button onClick={()=>this.openUpdatePopup(lineItem)}>Edit</button>
                      <Popup position="center" open={this.state.updatePopupFlag} closeOnDocumentClick>
                          <div className="editPanel" >
                              <input placeholder={lineItem.company_name} value={this.state.editRecord.company_name} onChange={this.handleChange('company_name')}/> 
                              <button onClick={this.updateRecord}>Save</button> 
                              <button onClick={this.cancelUpdate}>Cancel</button> 
                          </div>
                      </Popup>
                    </td>
                    <td>
                      <button onClick={()=>this.openDeletePopup(lineItem)}>Delete</button>
                      <Popup position="center" open={this.state.deletePopupFlag}>
                            <div className="editPanel" >
                                <h3>Are you sure you would like to delete this record?</h3> 
                                <p>Deleted companies will no longer be avialable to select for new records, </p> 
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
export default connect(mapStoreToProps)(AdminCompany);
