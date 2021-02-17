import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackingApi from '../TrackingApi/TrackingApi'
import './AdminTaskList.css'

const getCookie = (cookieName) => {
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

const update = 'this.state.updateRecord';

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
      tracking_number: '',
      notes: '',
      updated_by: '',
    }
  };

  componentDidMount() {
    this.setState({
      updateRecord: this.props.task
    })
  }

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
    });
  }

  save = () => {
    this.props.dispatch({ type: 'UPDATE_TASK', payload: this.state });
    this.showEditTask(); //closes the edit view
  }

  delete = () => {
    this.props.dispatch({ type: 'DELETE_TASK', payload: this.state });
    this.setState({
      showEditTask: '',
    })
  }

  dateConversion = fieldValue => {
    if (fieldValue != null) {
      let year = fieldValue.slice(0, 4);
      let month = fieldValue.slice(5, 7);
      let day = fieldValue.slice(8, 10);
      return `${month}/${day}/${year}`
    }
  }

  confirmSend = (id) => {
    console.log('sending email for task', id);
    this.props.dispatch({ type: 'EMAIL_TASK', payload: { id: id, project: getCookie('project') } })
    alert('Email sent')
  }

  render() {
    return (
      // one task is held entirely within this div
      <div className="container-task metal rounded" >
        {/* show who the task is assigned to */}
        <div className="highlighter">
          <h2> {this.props.task.task_name}  </h2>
        </div>
        <p> Assigned to: {this.props.task.company_name} </p>
        {/* check if in edit mode */}
        {this.state.showEditTask
          // If editing
          ? <div>

            {this.props.task.task_name === 'Schedule Installation' &&
              <div>
                <p>
                  <label>Scheduled Install Date: {this.dateConversion(this.props.task.scheduled_date)}
                    <input type='date' onChange={(event => this.handleChange(event, 'scheduled_date'))} value={update.date_scheduled} placeholder={this.props.task.scheduled_date} />
                  </label>
                </p>
                <p>
                  <label> Technician Info: <br />
                    <textarea
                      placeholder="name and contact information of installation technician"
                      rows="2"
                      cols="50"
                      value={this.state.updateRecord.technician_info}
                      onChange={(event => this.handleChange(event, 'technician_info'))} />
                  </label>
                </p>
              </div>}
            {this.props.task.task_name === 'Order Materials' &&
              <p>
                <label>Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)}
                  <input type='date' onChange={(event => this.handleChange(event, 'scheduled_date'))} value={update.date_scheduled} placeholder={this.props.task.scheduled_date} />
                </label>
              </p>
            }
            <p>
              <label>Final Due Date: {this.dateConversion(this.props.task.nlt_date)}
                <input type='date' onChange={(event => this.handleChange(event, 'nlt_date'))} placeholder={this.props.task.nlt_date} />
              </label>
            </p>
            <label>Status: {this.state.updateRecord.status_type}
              <select onChange={(event) => this.handleChange(event, 'task_status')}>
                <option value=''></option>
                {this.props.store.admin.taskStatusReducer.map((status) => {
                  return <option key={status.id} value={status.id}>{status.status_type}</option>
                })}
              </select>
            </label> <br />
            {this.props.task.task_name === 'Order Materials' &&
              <p>
                <label> Tracking Number:
                  <input type="text" onChange={(event => this.handleChange(event, 'tracking_id'))} placeholder={this.props.task.tracking_id}></input>
                </label>
              </p>}
            <label> Notes:  <br />
              <textarea value={this.state.updateRecord.notes} onChange={(event => this.handleChange(event, 'notes'))} rows="10" cols="50"></textarea>
            </label>
          </div>

          // If not editing
          : <div>

            {/* if a materials task, show delivery date */}
            {this.props.task.task_name === 'Order Materials' &&
              <p> Delivery Date: {this.dateConversion(this.props.task.scheduled_date)} </p>}
            {/* if an installation task, show installation date */}
            {this.props.task.task_name === 'Schedule Installation' &&
              <p> Scheduled Install Date: {this.dateConversion(this.props.task.scheduled_date)} <br />
            Technician Info: {this.props.task.technician_info}</p>}
            <p> Final Due Date: {this.dateConversion(this.props.task.nlt_date)} </p>
            <p>Status: {this.props.task.status_type}  </p>
            {/* show shipping information if there is any */}
            {this.props.task.task_name === 'Order Materials' && this.props.task.tracking_id &&
              <div className="tracking formPanel slate">
                <TrackingApi tracking_number={this.props.task.tracking_id} />
              </div>}
            {this.props.task.notes &&
              <p>Notes: {this.props.task.notes}</p>
            }
            <p>Last Updated By: {this.props.task.updated_by}</p>
          </div>
        }



        {/* check edit mode and display correct buttons accordingly */}
        {this.state.showEditTask
          ?
          // buttons to show when not in edit mode
          <div className="task-buttons">
            {/* save button */}
            <button className="btn" onClick={this.save}>Save</button>
            {/* cancel button to toggle edit mode */}
            <button className="btn" onClick={this.showEditTask}>Cancel</button>
            {/* delete button */}
          </div>
          :
          // buttons to show when not in edit mode
          <div className="task-buttons">
            {/* edit button to toggle edit mode */}
            {this.props.store.user.user_type !== "client" &&
              <button
                className="btn"
                onClick={this.showEditTask}>
                {this.props.store.user.user_type === "admin"
                  ? "Edit"
                  : "Update"
                }
              </button>
            }
            {/* notify button sends reminder email to party responsible for task */}
            {this.props.store.user.user_type === "admin" &&
              <button
                className="btn"
                onClick={(event) => this.confirmSend(this.props.task.id)}>
                Notify Contractor via Email
            </button>
            }
            {this.props.store.user.user_type === "admin" &&
              <button className="btn btn-delete" onClick={this.delete}>Delete Task</button>
            }
          </div>
        }
        {/* show the last time a reminder was sent, if any */}
        {this.props.task.notified_date && this.props.store.user.user_type === "admin" &&
          <p>Contractors Notified: {this.dateConversion(this.props.task?.notified_date)}</p>}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminTaskList);