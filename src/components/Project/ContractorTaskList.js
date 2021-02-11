import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


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

  // returns the date in the day/month/year format
  dateConversion = date => {
    // console.log(...date);
    let year = date[0]+date[1]+date[2]+date[3];
    let month = date[5]+date[6];
    let day = date[8]+date[9];
    return( day + "/" + month + "/" + year);
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
                    {this.state.showEditTask ? 
                        <>  <button onClick={this.save}>Save</button> </> : 
                        <button onClick={ this.showEditTask}>Update</button>
                    }
        </center>                
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContractorTaskList);