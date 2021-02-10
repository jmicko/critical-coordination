import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminTaskStatus/AdminTaskStatus.css'
import AddTastStatusForm from '../AddTaskStatusForm/AddTaskStatusForm';

class AdminTaskStatus extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_TASKSTATUS'});
  }

  state = {
    showAddStatus: false,
    updatePopupFlag: false,
    deletePopupFlag: false,
    editRecord:{
      id: 0,
      status_type: '',
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
    this.props.dispatch({ type: 'UPDATE_TASKSTATUS', payload: this.state.editRecord});  
    this.setState({
      updatePopupFlag: false,
      deletePopupFlag: false,
      editRecord: {
        id: 0,
        status_type: '',
        archived: false
      }
    })
    this.props.dispatch({type: 'FETCH_TASKSTATUS'})
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
        status_type: passedRecord.status_type,
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
        status_type: passedRecord.status_type,
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
        status_type: '',
        archived: false
      }
    })
  }

  toggleShow = () => {
    this.setState({
      showAddStatus: !this.state.showAddStatus,
    })
  }

  render() {
    return (
      <div>
        <h3>Admin Task Status Page</h3>
              {/* {JSON.stringify(this.state)} */}
              {this.state.showAddStatus ? <> <AddTastStatusForm /> <button onClick={this.toggleShow}>Close</button> </>
              : <button onClick={this.toggleShow}>Add Task Status</button>
              }
             

              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>Status</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.taskStatusReducer.map((lineItem, index) => {
                        return (
                          <tr key={index} data={lineItem.id}>
                              <td>{lineItem.status_type}</td>
                              <td>
                                <button onClick={()=>this.openUpdatePopup(lineItem)}>Edit</button>
                                <Popup position="center" open={this.state.updatePopupFlag} closeOnDocumentClick>
                                    <div className="editPanel" >
                                        <input placeholder={lineItem.status_type} value={this.state.editRecord.status_type} onChange={this.handleChange('status_type')}/> 
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
export default connect(mapStoreToProps)(AdminTaskStatus);
