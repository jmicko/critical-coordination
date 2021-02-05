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
    recordID: 0,
    editRecord:{
      status_type: '',
    },
    showAddStatus: false
  }

  updateState = (passedRecord) => {
    console.log (`UpdateState: `, passedRecord);
    this.setState({
      recordID: passedRecord.id, 
      editRecord: {
        status_type: passedRecord.status_type
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
    this.props.dispatch({ type: 'UPDATE_TASKSTATUS', payload: this.state.editRecord });  
    this.props.dispatch({type: 'FETCH_TASKSTATUS'});  
    // TODO -close popup?   how??
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
                          <tr key={index}>
                              <td>{lineItem.status_type}</td>
                              <td>
                                <Popup trigger={<button>Edit</button>} position="center" >
                                    <div className="editPanel" onClick={ () => this.updateState(lineItem) }>
                                        <input placeholder={lineItem.status_type} value={this.state.editRecord.status_type} onChange={this.handleChange('status_type')}/> 
                                        <button onClick={this.updateRecord}>Save</button> 
                                    </div>
                                </Popup>
                              </td>
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
export default connect(mapStoreToProps)(AdminTaskStatus);
