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
    console.log(this.props.task.id);
    
    this.setState({
      showEditTask: !this.state.showEditTask,
      updateRecord: {task_id: this.props.task.id}
    })
  }

  save = () => {   
    console.log('SAVE STATE', this.state);
     
    this.props.dispatch({ type: 'UPDATE_TASK', payload: this.state }) 

   
    console.log(this.props);
    
    this.showEditTask() //closes the edit view
  }

    // returns the date in the day/month/year format
  dateConversion = date => {
     // console.log(...date);
    //let year = date[0]+date[1]+date[2]+date[3];
    //let month = date[5]+date[6];
    //let day = date[8]+date[9];
    //return( day + "/" + month + "/" + year);
  }

  render() {
    return (
      <div >
       {this.state.showEditTask ? <label>Task Type: &nbsp;
                                    <select value={this.state.type} onChange={(event) => this.handleChange(event, 'task_type')}>
                                      <option value=''></option>
                                      <option value="1">Materials</option>
                                      <option value="2">Install</option>
                                      <option value="3">Invoice</option>
                                      <option value="4">Custom</option>
                                    </select>
                                  </label> :  <p> Task: {this.props.task.task_name}  </p>} 
       {this.state.showEditTask ? <p><label>Date Scheduled:<input type='date' onChange={ (event => this.handleChange(event, 'date_scheduled'))} placeholder={this.props.task.scheduled_date}></input></label></p> :  <p> Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>} 
       {this.state.showEditTask ? <p><label>NLT Date:<input type='date' onChange={ (event => this.handleChange(event, 'nlt_date'))} placeholder={this.props.task.nlt_date}></input></label></p> :  <p> NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>}
       {this.state.showEditTask ? <label>Status:<select onChange={(event) => this.handleChange(event, 'task_status')}>
                                    <option value=''></option>
                                    {this.props.store.admin.taskStatusReducer.map((status) => {
                                      return <option key={status.id} value={status.id}>{status.status_type}</option>
                                    })}
                                  </select></label> :  
                                  <p>Status: {this.props.task.status_type}  </p>}
                                  {this.props.task.task_name === 'Order Materials' &&
                                  <TrackingApi tracking_number={this.props.task.tracking_id}/>}
       
        <center>
                    {this.state.showEditTask ? 
                        <>  <button onClick={this.save}>Save</button> </> : 
                        <button onClick={this.showEditTask}>Edit</button>
                    }
        </center>                
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminTaskList);