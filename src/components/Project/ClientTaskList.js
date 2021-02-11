import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class ClientTaskList extends Component {

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
      <div>
        <p>Task: {this.props.task.task_name} </p>
        <p>Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>
        <p>NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>    
        <p>Status: {this.props.task.status_type}</p> 
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ClientTaskList);