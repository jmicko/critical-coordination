import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackingApi from '../TrackingApi/TrackingApi'

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class ContractorTaskList extends Component {
  
  state = {
    project_id: getCookie('project'),
    showEditTask: '',
    updateRecord: {
      task_id: '',
      task_status: '',
      date_scheduled: '',
    }
  };

  handleChange = (event, name) => {
    this.setState({ 
      updateRecord: {
        ...this.state.updateRecord,
        [name]: event.target.value 
      }
    });
  }

  showEditTask = () => {
    this.setState({
      showEditTask: !this.state.showEditTask,
      updateRecord: {task_id: this.props.task.id}
    })
  }

  save = () => {
    this.props.dispatch({ type: 'CONTRACTOR_UPDATE_TASK', payload: this.state });     
    this.showEditTask();
  }

  dateConversion = fieldValue => {
    if( fieldValue != null ) { 
    let year = fieldValue.slice(0, 4);
    let month = fieldValue.slice(5, 7);
    let day = fieldValue.slice(8, 10);
    return `${month}/${day}/${year}`
    }
  }

  render() {
    return (
      <div >
      <p>Task: {this.props.task.task_name}  </p> 
      {this.state.showEditTask ? <p><label>DateScheduled:<input type='date' onChange={ (event => this.handleChange(event, 'date_scheduled'))} placeholder={this.props.task.scheduled_date}></input></label></p> :  <p> Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>} 
      <p> NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>
      {this.state.showEditTask ? <label>Status:<select onChange={(event) => this.handleChange(event, 'status')}>
                                    <option value=''></option>
                                    {this.props.store.admin.taskStatusReducer.map((status) => {
                                      return <option key={status.id} value={status.id}>{status.status_type}</option>
                                    })}
                                  </select></label> :  
                                  <p> Status: {this.props.task.status_type}  </p>}
        <center>               
          {this.props.task.task_name === 'Order Materials' && <TrackingApi />}
          {this.state.showEditTask ? <>  <button onClick={this.save}>Save</button> <button onClick={this.showEditTask}>Cancle</button> </> : <button onClick={ this.showEditTask}>Update</button>}
        </center>                
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContractorTaskList);