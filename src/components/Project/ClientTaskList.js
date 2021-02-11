import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Popup from 'reactjs-popup';
import TrackingApi from '../TrackingApi/TrackingApi'


class ClientTaskList extends Component {

  render() {      
    return (
      <div>
        <p>Task: {this.props.task.task_name} </p>
        <p>Date Scheduled: {this.props.task.scheduled_date} </p>
        <p>NLT Date: {this.props.task.nlt_date} </p>    
        <p>Status: {this.props.task.status_type}</p> 
        {this.props.task.task_name === 'Order Materials' &&
          <TrackingApi />}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ClientTaskList);