import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackingApi from '../TrackingApi/TrackingApi'


class ContractorTaskList extends Component {
  
  state = {
    status: '',
    showEditTask: '',
  };

  handleChange = (event, name) => {
    this.setState({
        newTask: {
            ...this.state.newTask,
            [name]: event.target.value
        }
    });
  }

  showEditTask = () => {
    this.setState({
      showEditTask: !this.state.showEditTask
    })
  }

  save = () => {
    this.showEditTask()
    
  }

  dateConversion = fieldValue => {
    let year = fieldValue.slice(0, 4);
    let month = fieldValue.slice(5, 7);
    let day = fieldValue.slice(8, 10);
    return `${month}/${day}/${year}`
  }

  render() {
    return (
      <div >
      <p>Task: {this.props.task.task_name}  </p> 
      {this.state.showEditTask ? <p><label>DateScheduled:<input type='date' placeholder={this.props.task.scheduled_date}></input></label></p> :  <p> Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>} 
      <p> NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>
      {this.state.showEditTask ? <label>Status:<select onChange={(event) => this.handleChange(event, 'status')}>
                                    <option value=''></option>
                                    {this.props.store.admin.taskStatusReducer.map((status) => {
                                      return <option key={status.id} value={status.id}>{status.status_type}</option>
                                    })}
                                  </select></label> :  
                                  <p> NLT Date: {this.props.task.nlt_date}  </p>}
        <center>               
          {this.props.task.task_name === 'Order Materials' && <TrackingApi />}

          {this.state.showEditTask ? <>  <button onClick={this.save}>Save</button> </> : <button onClick={ this.showEditTask}>Update</button>}
        </center>                
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContractorTaskList);