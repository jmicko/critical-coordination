import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TaskList from './TaskList';


const getCookie = (cookieName) => {
    // Get name followed by anything except a semicolon
    const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
  }

class ProjectTitle extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_PROJECT', payload: getCookie('project') })
  }
    
   // returns the date in the day/month/year format
   dateConversion = date => {
    let year = date[0] + date[1] + date[2] + date[3];
    let month = date[5] + date[6];
    let day = date[8] + date[9];
    return (day + "/" + month + "/" + year);
}
  render() {
    return (
    
       <div className="container paper">
          <h3>{this.props.store.projectReducer.projectReducer[0]?.project_name}</h3>
          <p>Customer: {this.props.store.projectReducer.projectReducer[0]?.company_name}</p>
          <p>Project Name: {this.props.store.projectReducer.projectReducer[0]?.project_name}</p>
          <p>PO Number: {this.props.store.projectReducer.projectReducer[0]?.PO_Number}</p>
          <p>Scheduled Completion: {this.props.store.projectReducer.projectReducer[0]?.due_date}</p>
          <p>Address: {this.props.store.projectReducer.projectReducer[0]?.address}</p>
          <p>Notes: {this.props.store.projectReducer.projectReducer[0]?.notes}</p>
        <TaskList/>  

        </div>
          
    );
  }
}

export default connect(mapStoreToProps)(ProjectTitle);