import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import TrackingApi from '../../TrackingApi/TrackingApi'
import Popup from 'reactjs-popup';
import './AdminTaskList.css'

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class AdminTaskList extends Component {

  state = {
    project_id: getCookie('project'),
    showEditTask: '',
    updateRecord: {
      task_id: '',
      task_status: '',
      task_type: '',
      nlt_date: '',
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
      updateRecord: { task_id: this.props.task.id }
    });
  }

  save = () => {
    this.props.dispatch({ type: 'UPDATE_TASK', payload: this.state });
    this.showEditTask(); //closes the edit view
  }

  delete = () => {
    this.props.dispatch({ type: 'DELETE_TASK', payload: this.state });
  }

  dateConversion = fieldValue => {
    if (fieldValue != null) {
      let year = fieldValue.slice(0, 4);
      let month = fieldValue.slice(5, 7);
      let day = fieldValue.slice(8, 10);
      return `${month}/${day}/${year}`
    }
  }

  fieldValidation = () => {
    if (this.state.updateRecord.task_id &&
      this.state.updateRecord.task_status &&
      this.state.updateRecord.task_type &&
      this.state.updateRecord.nlt_date &&
      this.state.updateRecord.date_scheduled
    ) {
      { this.save() }
    } else {
      alert('Please fill out all the fields');
    }
  }

  confirmSend = (id) => {
    console.log('sending email for task', id);
    this.props.dispatch({ type: 'EMAIL_TASK', payload: { id: id, project: getCookie('project') } })
    const date = (new Date()).toLocaleString("en-US")
    console.log(date);
  }

  render() {
    return (
      // one task is held entirely within this div
      <div className="container-task" >
        {/* show who the task is assigned to */}
        <p> Assigned to: {this.props.task.company_name} </p>

        {/* check if in edit mode */}
        {this.state.showEditTask
          // If editing
          ? <div>

            <label>Task Type: &nbsp;
            <select value={this.state.type} onChange={(event) => this.handleChange(event, 'task_type')}>
                <option value=''></option>
                <option value="1">Materials</option>
                <option value="2">Install</option>
                <option value="3">Invoice</option>
                <option value="4">Custom</option>
              </select>
            </label>

            <p><label>Date Scheduled:<input type='date' onChange={(event => this.handleChange(event, 'date_scheduled'))} placeholder={this.props.task.scheduled_date}></input></label></p>

            <p><label>Final Due Date:<input type='date' onChange={(event => this.handleChange(event, 'nlt_date'))} placeholder={this.props.task.nlt_date}></input></label></p>

            <label>Status:
            <select onChange={(event) => this.handleChange(event, 'task_status')}>
                <option value=''></option>
                {this.props.store.admin.taskStatusReducer.map((status) => {
                  return <option key={status.id} value={status.id}>{status.status_type}</option>
                })}
              </select>
            </label>
          </div>

          // If not editing
          : <div>
            <p> Task: {this.props.task.task_name}  </p>
            <p> Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>
            <p> Final Due Date: {this.dateConversion(this.props.task.nlt_date)} </p>
            <p>Status: {this.props.task.status_type}  </p>
          </div>
        }

        {/* show shipping information if there is any */}
        {this.props.task.task_name === 'Order Materials' &&
          <TrackingApi tracking_number={this.props.task.tracking_id} />}

        {/* show notes */}
        <p>Notes: {this.props.task.notes}</p>

        {/* check edit mode and display correct buttons accordingly */}
        {this.state.showEditTask
          ?
          // buttons to show when not in edit mode
          <div className="task-buttons">
            {/* save button */}
            <button className="btn" onClick={this.fieldValidation}>Save</button>
            {/* cancel button to toggle edit mode */}
            <button className="btn" onClick={this.showEditTask}>Cancel</button>
            {/* delete button */}
            <button className="btn" onClick={this.delete}>Delete</button>
          </div>
          :
          // buttons to show when not in edit mode
          <div className="task-buttons">
            {/* edit button to toggle edit mode */}
            <button
              className="btn"
              onClick={this.showEditTask}>
              Edit
            </button>
            {/* notify button sends reminder email to party responsible for task */}
            <button
              className="btn"
              onClick={(event) => this.confirmSend(this.props.task.id)}>
              Notify Contractor via Email
            </button>
          </div>
        }
         {/* show the last time a reminder was sent, if any */}
        {this.props.task.notified_date &&
          <p>Last Notified Date: {this.props.task?.notified_date}</p>}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminTaskList);