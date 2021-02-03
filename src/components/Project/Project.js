import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name Project with the name for the new
// component.
class Project extends Component {



    navigate = web_address => {
        this.props.history.push(web_address);
      }



  render() {
    return (
      <div>
        <h1>This is the Project Page</h1>
    
      <button onClick={ () => this.navigate('/task') } >Button to the task page</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Project);