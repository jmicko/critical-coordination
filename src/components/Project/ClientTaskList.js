import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TrackingApi from '../TrackingApi/TrackingApi'


class ClientTaskList extends Component {

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
      <div>
        <p>Task: {this.props.task.task_name} </p>
        <p>Date Scheduled: {this.dateConversion(this.props.task.scheduled_date)} </p>
        <p>NLT Date: {this.dateConversion(this.props.task.nlt_date)} </p>    
        <p>Status: {this.props.task.status_type}</p> 
        {this.props.task.task_name === 'Order Materials' &&
          <TrackingApi />}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ClientTaskList);