import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Project with the name for the new
// component.
class Project extends Component {

componentDidMount(){
  this.props.dispatch({ type: 'FETCH_PROJECT', payload: getCookie('project') }) 
}

    navigate = web_address => {
        this.props.history.push(web_address);
      }



  render() {
    return (
      <div className="container paper">
        <h1>This is the Project Page</h1>
        <p>Customer: {this.props.store.projectReducer[0]?.company_name}</p>
        <p>Project Name: {this.props.store.projectReducer[0]?.project_name}</p>
        <p>PO Number: {this.props.store.projectReducer[0]?.PO_Number}</p>
        <p>Scheduled Completion: {this.props.store.projectReducer[0]?.due_date}</p>
        <p>Address: {this.props.store.projectReducer[0]?.address}</p>
    
      <button onClick={ () => this.navigate('/task') } >Button to the task page</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);