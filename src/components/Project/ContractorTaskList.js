import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';


class ContractorTaskList extends Component {
  state = {
    status: '',
  };

  handleChange = (event, name) => {
    this.setState({
        newTask: {
            ...this.state.newTask,
            [name]: event.target.value
        }
    });
}


  render() {
      console.log(this.state);
      
    return (
      <div>
        <p>Task: {this.props.task.task_name} </p>
        <p>Date Scheduled: <input type="date" value={this.props.task.scheduled_date} /> </p>
        <p>NLT Date: {this.props.task.nlt_date} </p>    
        <label> Change Status: &nbsp;
            <select onChange={(event) => this.handleChange(event, 'status')}>
                <option value=''></option>
                {this.props.store.admin.taskStatusReducer.map((status) => {
                    return <option key={status.id} value={status.id}>{status.status_type}</option>
                })}
            </select>
        </label>    
        <button>Submit</button>                            
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ContractorTaskList);