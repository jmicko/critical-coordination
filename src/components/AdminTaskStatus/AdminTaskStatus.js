import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import mapStoreToProps from '../../redux/mapStoreToProps';
import '../AdminTaskStatus/AdminTaskStatus.css'

class AdminTaskStatus extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  async componentDidMount() {
    // Get's data to populate lists/tables
    this.props.dispatch({type: 'FETCH_TASKSTATUS'});
  }

  state = {
    recordID: 0,
    editRecord:{
      id: 0,
      status_type: '',
      archived: false,
    }
  }

  updateState = (passedRecord, archiveFlag=false) => {
    console.log (`UpdateState: `, passedRecord);
    this.setState({
      recordID: passedRecord.id, 
      editRecord: {
        id: passedRecord.id,
        status_type: passedRecord.status_type,
        archived: archiveFlag
      }
    })
    
  }

  handleChange = name => event => {
    this.setState({ 
      editRecord: {
        [name]: event.target.value 
      }
    });    
  }

  updateRecord = () => { 
    this.props.dispatch({ type: 'UPDATE_TASKSTATUS', payload: this.state.editRecord});  
    this.props.dispatch({type: 'FETCH_TASKSTATUS'});  
    // TODO -close popup?   how??
  }

  
  cancelUpdate = () => { 
    this.setState({
      recordID: 0, 
      editRecord: {
        id: 0,
        status_type: '',
        archived: false
      }
    })
    // TODO -close popup?   how??
  }


  render() {
    return (
      <div>
        <h3>Admin <span style={{textDecoration: "underline"}}>User</span> Page, {this.props.store.user.first_name}!</h3>

              <button >Add Task Status</button>

              <table className="tableClass">
                <thead className="headerClass">
                  <tr><th>Status</th><th>&nbsp;</th><th>&nbsp;</th></tr>
                </thead>
                <tbody className="bodyClass">
                    {this.props.store.admin.taskStatusReducer.map((lineItem, index) => {
                        return (
                          <tr key={index}>
                              <td>{lineItem.status_type}</td>
                              <td>
                                <Popup trigger={<button>Edit</button>} position="center" >
                                    <div className="editPanel" onClick={ () => this.updateState(lineItem) }>
                                        <input placeholder={lineItem.status_type} value={this.state.editRecord.status_type} onChange={this.handleChange('status_type')}/> 
                                        <button onClick={this.updateRecord}>Save</button> 
                                        <button onClick={this.cancelUpdate}>Cancel</button> 
                                    </div>
                                </Popup>
                              </td>
                              <td>
                                <Popup trigger={<button>Delete</button>} position="center" >
                                      <div className="editPanel" onClick={ () => this.updateState(lineItem, true) }>
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
