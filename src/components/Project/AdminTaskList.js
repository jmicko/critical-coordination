import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class AdminTaskList extends Component {
  state = {
    status: '',
    showEditTask: '',
    type: '',
  };

  handleChange = (event, name) => {
    this.setState({ 
      [name]: event.target.value 
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
       {this.state.showEditTask ? <label>Task Type: &nbsp;
                                    <select value={this.state.type} onChange={(event) => this.handleChange(event, 'type')}>
                                      <option value=''></option>
                                      <option value="1">Materials</option>
                                      <option value="2">Install</option>
                                      <option value="3">Invoice</option>
                                      <option value="4">Custom</option>
                                    </select>
                                  </label> :  <p> Task: {this.props.task.task_name}  </p>} 
       {this.state.showEditTask ? <p><label>DateScheduled:<input type='date' placeholder={this.props.task.scheduled_date}></input></label></p> :  <p> Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>} 
       {this.state.showEditTask ? <p><label>NLT Date:<input type='date' placeholder={this.props.task.nlt_date}></input></label></p> :  <p> NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>}
       {this.state.showEditTask ? <label>Status:<select onChange={(event) => this.handleChange(event, 'status')}>
                                    <option value=''></option>
                                    {this.props.store.admin.taskStatusReducer.map((status) => {
                                      return <option key={status.id} value={status.id}>{status.status_type}</option>
                                    })}
                                  </select></label> :  
                                  <p>Status: {this.props.task.status_type}  </p>}
        <center>
                    {this.state.showEditTask ? 
                        <>  <button onClick={this.save}>Save</button> </> : 
                        <button onClick={ this.showEditTask}>Edit</button>
                    }
        </center>                
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminTaskList);